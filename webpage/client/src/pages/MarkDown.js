import React, {useContext} from "react";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {useNavigate, useParams} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Container, TextField, FormControlLabel, Checkbox, Box } from "@mui/material";
import {useState, useEffect, useCallback} from "react";
import { Link } from "react-router-dom";
import './Style.css';
import SideDrawer from "../components/markdown/SideDrawer";
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


export default function MarkDown() {
  const SAVE_INTERVAL_MS = 2000
  const token = localStorage.getItem("jsontoken");
  const {id: documentId} = useParams();
  const [socket, setSocket] = useState()
  const [markDown, setMarkDown] = useState("Input source code here");
  const [Title, setTitle] = useState("Welcome");
  //Connect to socket
  useEffect(() => {
    const s = io("https://orbital2-api.onrender.com", {query: {token}});
    s.once("title-sent", document => {
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

    socket.once("load-markdown", document => {
      setMarkDown(document.data);
    })

    socket.emit("get-markdown", {documentId, Title});
  }, [socket, documentId])

  //Saves the document whenever changes are made
  useEffect(() => {
    if (socket == null || markDown == null) return;
    socket.emit("save-markdown", {documentId, markDown});
   
  }, [socket, documentId, markDown])

  useEffect(() => {
    if (socket == null || Title == null) return;
      socket.emit("save-markdowntitle", {documentId, Title})
  }, [socket, documentId, Title])

  //Updates changes from other users
  useEffect(() => {
    if (socket == null) return;
  
    socket.on('update-markdown', markDown => {
      setMarkDown(markDown);
    });
  
    socket.on('update-title', title => {
      setTitle(title);
    });
  
    return () => {
      socket.off('update-markdown');
      socket.off('update-title');
    }
  }, [socket]);



    return (
        <>
        <ThemeProvider theme={theme}>
        <SideDrawer markDown = {markDown} setMarkDown = {setMarkDown} Title = {Title} setTitle = {setTitle}/>
        </ThemeProvider>
    </>
    );
}

