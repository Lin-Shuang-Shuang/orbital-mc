import * as React from 'react';
import {useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {useNavigate} from "react-router-dom";
import { TextField, Button, Link } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem  from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StickyNote from '../components/StickyNote';
import StickyNoteList from '../components/StickyNoteList';
import SearchStickyNote from '../components/SearchStickyNote';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import logo from '../images/NoTiFy-logo.png'
import Comments from '../components/Comment/Comments'
import localAxios from '../api/Axios';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



export default function PostIt() {

  const [notes, setNotes] = useState([
    /*
  		{
  			id: nanoid(),
  			text: 'This is my first!',
  			date: '15/04/2023',
  		},
  		{
  			id: nanoid(),
  			text: 'This is my second!',
  			date: '21/05/2023',
  		},
  		{
  			id: nanoid(),
  			text: 'This is my third!',
  			date: '28/06/2023',
  		},
      */
  	]);

  	const [searchText, setSearchText] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
      fetchNotes();
    }, []);

    //Fetch and display all notes that belong to a user
    const fetchNotes = async () => {
      const token = localStorage.getItem("jsontoken");
      const response = await localAxios.get('/api/stickyNoteRouter/notes', {
        headers: {
          'Authorization': `Bearer ${token}`
      }});
      setNotes(response.data.map(note => ({
        id: note._id,
        text: note.data,
      })))
    }

    //Create a new note
  	const addNote = async (text) => {
    		const newNote = {
    			id: nanoid(),
    			text: text
    		};
    		const newNotes = [...notes, newNote];
    		setNotes(newNotes);
        const id = newNote.id;
        const token = localStorage.getItem("jsontoken");
        const title = "Note" + id;
        await localAxios.post('/api/stickyNoteRouter/createNote', {id, token, title, text});
    };

    //Delete a note
    const deleteNote = async (id) => {
    		await localAxios.post(`/api/stickyNoteRouter/deleteNote/${id}`).then(window.location.reload());
    };

    //Share a note with someone (button to be implemented)


  const [Title, setTitle] = useState("Welcome");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogout = async (e) => {
              e.preventDefault();
              try {
                  localStorage.removeItem("jsontoken");
                  navigate("/");
              } catch(error) {
                  setError(error.response.data.message);
                  console.log(error.message);
              }
          }
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
  <>

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'black' }}>
        <Toolbar style={{ height: '8bor0px' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
              color: '#FFFFFF',
            }}
          >
            <MenuIcon />
          </IconButton>
          <div className="header" handleToggleDarkMode={setDarkMode}>
                    <Typography variant="h4">Sticky Notes</Typography>
                    <IconButton style={{ color: '#FFFFFF' }}
                              onClick={() =>
                                setDarkMode((previousDarkMode) => !previousDarkMode)
                              }
                              className='save'
                            >
                              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                            </IconButton>

                  </div>



        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} PaperProps={{sx: {backgroundColor: "black", color: "white",}}}>
        <DrawerHeader className="stickynote-drawer-header">
        <img src={logo} alt="Logo" style={{ height: '40px', margin: 'auto' }} />
          <IconButton onClick={handleDrawerClose} sx={{color: '#FFFFFF',}}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ bgcolor: 'white' }}/>
        <List>
          {['Dashboard', 'Logout'].map((text, index) => (
                          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                              onClick={index === 1 ? handleLogout : null} // Only add onClick for the logout button
                                    component={index === 0 ? Link : 'button'} // Use component={Link} for dashboard button, 'button' for logout button
                                    to={index === 0 ? "/Dashboard" : null} // Set the 'to' prop for the dashboard button
                              sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,

                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                  mr: open ? 3 : 'auto',
                                  justifyContent: 'center',
                                  color: '#FFFFFF',
                                }}
                              >
                                {index % 2 === 0 ? <DashboardIcon /> : <LogoutIcon />}
                              </ListItemIcon>
                              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
        <Divider sx={{ bgcolor: 'white' }}/>
        <List>
          {[].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,

                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
        <DrawerHeader />
        <div className={`${darkMode && 'dark-mode'}`}>
        <div className="StickyNoteContainer">

        <SearchStickyNote handleSearchNote={setSearchText} />
          <StickyNoteList
          notes={notes.filter((note) =>
          						note.text.toLowerCase().includes(searchText)
          					)}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          />


        </div>
        </div>
        <Comments currentUserId="1" />

        </Box>
       </Box>

            </>
            );
            };

