import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  Toolbar, Typography, IconButton, Stack, Container, TextField, FormControlLabel, Checkbox } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidV4} from 'uuid';
import { Link } from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {useNavigate} from "react-router-dom";
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem  from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import Quill from 'quill';
import {io} from 'socket.io-client';
import { Card, Button } from 'antd';
import UploadButton from '../components/UploadButton';
import DownloadButton from '../components/DownloadButton';
import ShareButton from '../components/ShareButton';
import DeleteButton from '../components/DeleteButton';
import "./Dashboard.css";
import AddMenuButton from "../components/AddMenuButton";
import UploadMarkdownButton from "../components/UploadMarkdownButton";
import ExportMarkdownButton from "../components/ExportMarkdownButton";
import DownloadMarkdownButton from "../components/DownloadMarkdownButton";
import ShareMarkdownButton from "../components/ShareMarkdownButton";
import DeleteMarkdownButton from "../components/DeleteMarkdownButton";
import CompileLatexButton from "../components/CompileLatexButton";
import ShareLatexButton from "../components/ShareLatexButton";
import DeleteLatexButton from "../components/DeleteLatexButton";
import logo from '../images/NoTiFy-logo.png'



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


export default function Dashboard() {



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

  const SAVE_INTERVAL_MS = 2000;
  const token = localStorage.getItem("jsontoken");
  const [socket, setSocket] = useState();
  const socketRef = useRef();
  const [documents, setDocuments] = useState([]);
  const [markdown, setMarkdown] = useState([]);
  const [latex, setLatex] = useState([]);
  //connect to socket.io
  useEffect(() => {
    const s = io("http://localhost:3003", {query: {token}});
    s.on('connect', () => {
    s.emit('get-all');
    s.emit('get-markdowns');
    s.emit('get-latexs');
    });
  
    s.on('found-documents', (documents) => {
      setDocuments(documents);
    });

    s.on('found-markdown', (markdowns) => {
       setMarkdown(markdowns);
    })

    s.on('found-latexs', (latex) => {
      setLatex(latex);
    })
  
    socketRef.current = s;
    return () => {
      s.disconnect()
    }
  }, [])

  const getPreview = (data) => {
    return data.length > 100 ? data.substring(0, 100) + "..." : data;
  }
 

   return (
        <>

        <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <AppBar position="fixed" open={open} className="app-bar" sx={{ backgroundColor: 'black' }}>
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
                  <Typography variant="h4">Your documents</Typography>
                  <AddMenuButton />

                </Toolbar>
              </AppBar>
              <Drawer variant="permanent" open={open} className="drawer" PaperProps={{sx: {backgroundColor: "black", color: "white",}}}>
              <div className="drawer-header">
                <DrawerHeader >
                <img src={logo} alt="Logo" style={{ height: '40px', margin: 'auto' }} />
                  <IconButton onClick={handleDrawerClose} sx={{color: '#FFFFFF',}}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </DrawerHeader>
                </div>
                <Divider sx={{ bgcolor: 'white' }} />
                <List >
                  {['Chat', 'Logout'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                         onClick={index === 1 ? handleLogout : null} // Only add onClick for the logout button
                         component={index === 0 ? Link : 'button'} // Use component={Link} for Chat button, 'button' for logout button
                         to={index === 0 ? "/Chat" : null} // Set the 'to' prop for the dashboard button
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
                           {index % 2 === 0 ? <ChatIcon /> : <LogoutIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ bgcolor: 'white' }} />
                <Typography sx={{ opacity: open ? 1 : 0, marginLeft: '10px', }}>
                  Folders
                </Typography>
                <List >
                  {['first', 'second', 'third'].map((text, index) => (
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
                          {index % 2 === 0 ? <FolderIcon /> : <FolderIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>

              <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
                <DrawerHeader />


    <div className="dashboard">
    <div >
      <UploadButton />
    </div>



      <div className="card-container">


      <h1 >Your Richtext Documents</h1>
      {documents.map((doc) => (
        <Card key={doc._id} title={doc.title} extra={<Link to={`/LoginHome/${doc._id}`} className="card">Open</Link>}>
          <p>{getPreview(doc.data.ops[0].insert)}</p>
          <div className="document-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <DownloadButton documentId={doc._id} title={doc.title} />
            <ShareButton documentId={doc._id} />
            <DeleteButton documentId={doc._id} />
          </div>
        </Card>
      ))}
      </div>

   <div>
      <UploadMarkdownButton />
    </div>
<div className="card-container">
      <h1 >Your MarkDown Documents</h1>
            {markdown.map((doc) => (
              <Card key = {doc._id} title = {doc.title} extra = {<Link to = {`/MarkDown/${doc._id}`} className="card">Open</Link>}>
                <div className="document-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ExportMarkdownButton documentId = {doc._id} title={doc.title} />
                  <DownloadMarkdownButton documentId = {doc._id} title={doc.title} />
                  <ShareMarkdownButton documentId = {doc._id} />
                  <DeleteMarkdownButton documentId = {doc._id} />
                </div>
              </Card>
            ) )
            }
            <div>
            {markdown.map}
            </div>
</div>
<div className="card-container">
      <h1 >Your LaTex Documents</h1>
            {latex.map((doc) => (
              <Card key = {doc._id} title = {doc.title} extra = {<Link to = {`/LaTex/${doc._id}`} className="card">Open</Link>}>
                <div className="document-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ShareLatexButton documentId = {doc._id} />
                  <CompileLatexButton documentId = {doc._id} title = {doc.title} />
                  <DeleteLatexButton documentId = {doc._id} />
                </div>
              </Card>
            ) )
            }
            <div>
            {latex.map}
            </div>
</div>



    </div>
    </Box>
            </Box>



    </>
    );
}

