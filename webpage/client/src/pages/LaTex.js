import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import localAxios from '../api/Axios';
import { saveAs } from 'file-saver';
import {useNavigate, useParams} from "react-router-dom";
import {io} from 'socket.io-client';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { BlockMath, InlineMath } from 'react-katex';
import gfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import {  Toolbar, Typography, IconButton, Button, Stack, Container, TextField, FormControlLabel, Checkbox, Box } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
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
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import logo from '../images/NoTiFy-logo.png'
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function LaTex() {
    const [latex, setLatex] = useState("");
    const [latexHtml, setLatexHtml] = useState("");
    const [Title, setTitle] = useState("Welcome");
    const token = localStorage.getItem("jsontoken");
    const {id: documentId} = useParams();
    const [socket, setSocket] = useState();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");

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
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };



    useEffect(() => {
        const s = io("https://orbital2-api.onrender.com:3003", {query: {token}});
        
        s.once("title-sent-latex", document => {
          setTitle(document.title);
        })
        
        setSocket(s);
    
        return () => {
          s.disconnect()
        }
      }, [token])
    
    
      //Get or create document
      
      useEffect(() => {
        if (socket == null) return
    
        socket.once("load-latex", document => {
          setLatex(document.data);
        })
    
        socket.emit("get-latex", {documentId, Title});
      }, [socket, documentId])
      
      //Saves the document whenever changes are made
      
      useEffect(() => {
        if (socket == null || latex == null) return;
        socket.emit("save-latex", {documentId, latex});
       
      }, [socket, documentId, latex])
    
      useEffect(() => {
        if (socket == null || Title == null) return;
          socket.emit("save-latextitle", {documentId, Title})
      }, [socket, documentId, Title])

      
      
      
    const compileLatex = async () => {
        
        const response = await localAxios.get(`/api/LaTexRouter/compileToPDF/${documentId}`, { responseType: 'blob' });
        saveAs(response.data, `${Title}.pdf`);
        
      };
    
      
      


      return (
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
                      }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <TextField  default ="Welcome" variant="filled" helperText="Please enter title"
                       margin="normal"
                       required
                       name="Title"
                       label="Title"
                       type="Title"
                       id="Title"
                       onChange={e => setTitle(e.target.value)}
                       value={Title}
                       InputProps={{
                               style: { color: 'white' },
                             }}

                    />





                  </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} PaperProps={{sx: {backgroundColor: "black", color: "white",}}}>
                  <DrawerHeader className="richtext-drawer-header">
                  <img src={logo} alt="Logo" style={{ height: '60px', margin: 'auto' }} />
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
                <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', marginTop: '84px' }} >
                  <DrawerHeader />
        <div>

          <textarea className = "textarea-latex" value={latex} onChange={e => setLatex(e.target.value)} />
          <button onClick={compileLatex}>Compile</button>
        </div>
        </Box>
        </Box>
      );
}