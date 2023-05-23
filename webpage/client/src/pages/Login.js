import React from "react";
import { Link } from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import localAxios from '../api/Axios';
import {useAuthContext} from '../hooks/useAuthContext';
import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Container, TextField, FormControlLabel, Checkbox, Box } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: "##ffffff",
      //contrastText: "#fff" //button text white instead of black
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});


export default function Login() {
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const loginURL = "/api/authRouter/login";
    const handleLogin = async (e) => {
        e.preventDefault();
        try { 
            const {data: response} = await localAxios.post(loginURL, {input, password});
            const jsontoken = response.data;
            localStorage.setItem("token", jsontoken);
            dispatch({type: 'login', payload: jsontoken});
            console.log(response.data);
            navigate("/LoginHome");
        } catch(error) {
            setError(error.response.data.message);
            console.log(error.message);
        }
    }

    return (
        <>
        <ThemeProvider theme={theme}>
        <AppBar position="relative" color="neutral">
            <Toolbar>
                <Button variant="text" color="primary" component={Link} to="/" size="large">
                    NoTiFy
                </Button>
            </Toolbar>
        </AppBar>
        </ThemeProvider>
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