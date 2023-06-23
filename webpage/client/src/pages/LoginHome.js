import React from "react";
import {useState, useEffect, useCallback, useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import localAxios from '../api/Axios';
import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Container, TextField, FormControlLabel, Checkbox, Box } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Drawer } from '@mui/material';
import Quill from "quill"
import "quill/dist/quill.snow.css"
import './Style.css';
import {io} from 'socket.io-client';


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

//connect to socket.io
    useEffect(() => {
        const s = io("http://localhost:3003", {query: {token}});
        s.emit("get-title", Title);
        s.once("load-title", title => {
          setTitle(title);
        }) 
        setSocket(s);
        
        return () => {
          s.disconnect()
        }
      }, [])

//allows us to save and load an edited document
    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once("load-document", document => {
          quill.setContents(document)
          quill.enable()
        })
        socket.emit("get-document", {documentId, Title})
        
      }, [socket, quill, documentId, Title])


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

                <AppBar position="static" >
                    <Toolbar>

                        <TextField  default ="Welcome" variant="outlined" helperText="Please enter title"
                                            margin="normal"
                                            required
                                            name="Title"
                                            label="Title"
                                            type="Title"
                                            id="password"
                                            onChange={(event) => 
                                              setTitle(event.target.value)
                                            }
                                            value={Title}

                                        />
                                        <div style={{flexGrow:1}}></div>
                        <Button variant="contained" component={Link} to="/MarkDown" >
                                                Markdown
                                            </Button>
                        <Button flex variant="contained" onClick = {handleLogout}>
                            Logout
                        </Button>


                    </Toolbar>
                </AppBar>
        </ThemeProvider>
        <div className="container" ref={wrapperRef}></div>




        </>

    );
};


