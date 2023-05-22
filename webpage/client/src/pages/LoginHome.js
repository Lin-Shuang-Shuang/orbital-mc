import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import localAxios from '../api/Axios';
import {useAuthContext} from '../hooks/useAuthContext';
import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Container, TextField, FormControlLabel, Checkbox, Box } from "@mui/material";
import { Link as MuiLink } from "@mui/material";

export default function LoginHome() {
    const { dispatch } = useAuthContext();
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
    return (
        <div>
            Welcome to your dashboard.
            <Button onClick = {handleLogout}> Logout </Button>
        </div>
    );
};
