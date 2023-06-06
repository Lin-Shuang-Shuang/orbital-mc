import React from "react";
import {useState, useEffect, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import localAxios from '../api/Axios';
import {useAuthContext} from '../hooks/useAuthContext';
import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Container, TextField, FormControlLabel, Checkbox, Box } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Drawer } from '@mui/material';
import Quill from "quill"
import "quill/dist/quill.snow.css"
import './Style.css';


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
    const { dispatch } = useAuthContext();
    const [Title, setTitle] = useState("Welcome");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem('user') 
            dispatch({ type: 'logout' })
            navigate("/");
        } catch(error) {
            setError(error.response.data.message);
            console.log(error.message);
        }
    }




    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return

        wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.append(editor);
        new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS }})

        return ()=> {
            wrapperRef.innerHTML = "";
        }
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
                                            onChange={(event) => setTitle(event.target.value)}
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


