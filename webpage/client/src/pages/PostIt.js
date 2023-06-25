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
  		{
  			id: nanoid(),
  			text: 'This is my first note!',
  			date: '15/04/2021',
  		},
  		{
  			id: nanoid(),
  			text: 'This is my second note!',
  			date: '21/04/2021',
  		},
  		{
  			id: nanoid(),
  			text: 'This is my third note!',
  			date: '28/04/2021',
  		},

  	]);

  	const [searchText, setSearchText] = useState('');
    const [darkMode, setDarkMode] = useState(false);


  	const addNote = (text) => {
    		const date = new Date();
    		const newNote = {
    			id: nanoid(),
    			text: text,
    			date: date.toLocaleDateString(),
    		};
    		const newNotes = [...notes, newNote];
    		setNotes(newNotes);
    };


    const deleteNote = (id) => {
    		const newNotes = notes.filter((note) => note.id !== id);
    		setNotes(newNotes);
    };



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
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ height: '8bor0px' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <TextField  default ="Notes" variant="filled" helperText="Please enter title"
                                                      margin="normal"
                                                      required
                                                      name="Title"
                                                      label="Title"
                                                      type="Title"
                                                      id="Title"
                                                      onChange={(event) => setTitle(event.target.value)}
                                                      value={Title}

                                                  />
                                                  <div style={{flexGrow:1}}></div>


        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
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
                                color: '#000000',
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                  mr: open ? 3 : 'auto',
                                  justifyContent: 'center',
                                }}
                              >
                                {index % 2 === 0 ? <DashboardIcon /> : <LogoutIcon />}
                              </ListItemIcon>
                              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
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
        <div className="header" handleToggleDarkMode={setDarkMode}>
          <h1>Notes</h1>
          <button
                    onClick={() =>
                      setDarkMode((previousDarkMode) => !previousDarkMode)
                    }
                    className='save'
                  >
                    Toggle Mode
                  </button>

        </div>
        <SearchStickyNote handleSearchNote={setSearchText} />
          <StickyNoteList
          notes={notes.filter((note) =>
          						note.text.toLowerCase().includes(searchText)
          					)}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote} />

        </div>
        </div>

        </Box>
       </Box>

            </>
            );
            };

