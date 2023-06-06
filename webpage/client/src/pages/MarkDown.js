import React, {useContext} from "react";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {useNavigate} from "react-router-dom";
import {useAuthContext} from '../hooks/useAuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Container, TextField, FormControlLabel, Checkbox, Box } from "@mui/material";
import {useState, useEffect, useCallback} from "react";
import { Link } from "react-router-dom";
import './Style.css';
import SideDrawer from "../components/markdown/SideDrawer";

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




    return (
        <>
        <ThemeProvider theme={theme}>
        <SideDrawer/>
        </ThemeProvider>

    </>
    );
}

