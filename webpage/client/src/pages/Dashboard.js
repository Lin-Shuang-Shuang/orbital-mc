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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Quill from 'quill';
import {io} from 'socket.io-client';
import { Card, Button } from 'antd';
import UploadButton from '../components/UploadButton';
import DownloadButton from '../components/DownloadButton';
import ShareButton from '../components/ShareButton';
import "./Dashboard.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
});


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


const [Title, setTitle] = useState("Welcome");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
  //connect to socket.io
  useEffect(() => {
    const s = io("http://localhost:3003", {query: {token}});
    s.on('connect', () => {
      s.emit('get-all');
    });
  
    s.on('found-documents', (documents) => {
      setDocuments(documents);
    });
  
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
        <ThemeProvider theme={theme}>
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
                  <Typography variant="h4">Sample</Typography>
                  <IconButton sx={{ color: "black" }} component={Link} to={`/LoginHome/${uuidV4()}`}>
                             <AddIcon />
                          </IconButton>

                </Toolbar>
              </AppBar>
              <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                <Typography align="left">NoTiFy</Typography>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                  {['Inbox', 'Send email', 'Drafts'].map((text, index) => (
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
                <Divider />
                <Typography>Folders</Typography>
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
                </Box>
        </Box>
        </ThemeProvider>
    <div className="dashboard">
      <h1>Your Documents</h1>
      <UploadButton />
      <div>
      {documents.map((doc) => (
        <Card key={doc._id} title={doc.title} extra={<Link to={`/LoginHome/${doc._id}`}>Open</Link>}>
          <p>{getPreview(doc.data.ops[0].insert)}</p>
          <DownloadButton documentId={doc._id} title={doc.title} />
          <ShareButton documentId={doc._id} /> 
        </Card>
      ))}
      </div>
    </div>

    </>
    );
}

