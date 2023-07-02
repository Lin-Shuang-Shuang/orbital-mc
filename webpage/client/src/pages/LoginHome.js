import {useState, useEffect, useCallback, useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import localAxios from '../api/Axios';
import {  Toolbar, Typography, IconButton, Button, Stack, Container, TextField, FormControlLabel, Checkbox, Box } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Quill from "quill"
import "quill/dist/quill.snow.css"
import './Style.css';
import {io} from 'socket.io-client';
import * as React from 'react';
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
import logo from '../images/NoTiFy-logo.png'

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



const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

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

export default function LoginHome() {
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

//my changes start here

    const SAVE_INTERVAL_MS = 2000
    const token = localStorage.getItem("jsontoken");
    const { id: documentId } = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
      };

      const handleDrawerClose = () => {
        setOpen(false);
      };

//connect to socket.io
    useEffect(() => {
        const s = io("http://localhost:3003", {query: {token}});
        s.once("load-title", title => {
          setTitle(title);
        }) 
        setSocket(s);
        
        return () => {
          s.disconnect()
        }
      }, [token])

//allows us to save and load an edited document
    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once("load-document", document => {
          quill.setContents(document)
          quill.enable()
        })
        socket.emit("get-document", {documentId, Title})
        
      }, [socket, quill, documentId])


//saves document every couple millisec
    useEffect(() => {
        if (socket == null || quill == null) return

        const interval = setInterval(() => {
          socket.emit("save-document", quill.getContents())
        }, SAVE_INTERVAL_MS)

        return () => {
          clearInterval(interval)
        }
      }, [socket, quill])

      useEffect(() => {
        if (socket == null || quill == null) return

        const interval = setInterval(() => {
          socket.emit("save-title", {documentId, Title})
        }, SAVE_INTERVAL_MS)

        return () => {
          clearInterval(interval)
        }
      }, [socket, quill, documentId, Title])

//upon receiving changes, server will update content on the doc accordingly
//(if we run 2 versions of the website at once, changes made to 1 version will be reflected on the other)
    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = delta => {
          quill.updateContents(delta)
        }
        socket.on("receive-changes", handler)

        return () => {
          socket.off("receive-changes", handler)
        }
      }, [socket, quill])

//tracks changes made on the doc by the user (sends them to server)
    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (delta, oldDelta, source) => {
          if (source !== "user") return
          socket.emit("send-changes", delta)
        }
        quill.on("text-change", handler)

        return () => {
          quill.off("text-change", handler)
        }
    }, [socket, quill])

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return

        wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.append(editor);
        const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS }})
        q.disable()
        q.setText("Loading...")
        setQuill(q)
          }, [])



    return (
    <>
    <ThemeProvider theme={theme}>
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
                                                          id="password"
                                                          onChange={(event) => setTitle(event.target.value)}
                                                          value={Title}

                                                      />
                                                      <div style={{flexGrow:1}}></div>


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
          <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
            <DrawerHeader />






        <div className="container" ref={wrapperRef}></div>

                        </Box>
                        </Box>
                        </ThemeProvider>




        </>

    );
};


