import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import localAxios from "../api/Axios";
import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Container, TextField, FormControlLabel, Checkbox, Box } from "@mui/material";
import { Link as MuiLink } from "@mui/material";

export default function Register() {
    const [username, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const registerURL = "/api/authRouter/register/";

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const {data: response} = await localAxios.post(registerURL, {username, email, password});
      console.log(response.data);
      navigate("/Login");
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
            <Stack component="login" marginTop={4} gap={2}>
                <Typography variant="h4" component="h2" align="center" paragraph="true">
                    Create New Account
                </Typography>
            </Stack>
            <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="input"
                    label="Username"
                    name="username"
                    //autoComplete="username"
                    autoFocus
                    onChange={(event) => {setuserName(event.target.value)}}
                    value = {username}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="input"
                    label="Email Address"
                    name="email"
                    //autoComplete="email"
                    autoFocus
                    onChange={(event) => {setEmail(event.target.value)}}
                    value = {email}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    //autoComplete="current-password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
            </Box>
        </Container>
  {/*<form className="Register" onSubmit = {handleRegister}>
      <input type = "username" placeholder = "Username..." 
        onChange={(event) => {setuserName(event.target.value)}}
        value = {username}
      />
      <input type = "email" placeholder = "Email..."
        onChange={(event) => {setEmail(event.target.value)}}
        value = {email} 
      />
      <input type = "password" placeholder = "Password..."
        onChange={(event) => {setPassword(event.target.value)}} 
        value = {password}
      />
      <button> Register </button> 
  </form>*/}
        </>
);
}