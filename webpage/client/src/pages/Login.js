import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import localAxios from '../api/Axios';
import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Container, TextField, FormControlLabel, Checkbox, Box } from "@mui/material";
import { Link as MuiLink } from "@mui/material";


export default function Login() {
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const loginURL = "/api/authRouter/login";
    const handleLogin = async (e) => {
        e.preventDefault();
        try { 
            const {data: response} = await localAxios.post(loginURL, {input, password});
            localStorage.setItem("token", response.data);
            console.log(response.data);
            navigate("/LoginHome");
        } catch(error) {
            setError(error.response.data.message);
            console.log(error.message);
        }
    }

    return (
        <>
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" component="h1" flexGrow={1}>
                    NoTiFy
                </Typography>
            </Toolbar>
        </AppBar>
            <Container maxWidth="sm">
                <Stack component="login" marginTop={2} gap={2}>
                    <Typography variant="h4" component="h2" align="center" paragraph="true">
                        Log in
                    </Typography>
                </Stack>

            <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="input"
                    label="Email Address/Username"
                    name="email/username"
                    autoComplete="email"
                    autoFocus
                    onChange={(event) => {setInput(event.target.value)}}
                    value = {input}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Log In
                </Button>
            </Box>
            </Container>
</>
    );
}