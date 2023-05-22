import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Container } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Home() {
    return (
        <header>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" component="h1" flexGrow={1}>
                        NoTiFy
                    </Typography>
                    <Button variant="contained" component={Link} to="Register">
                        Register
                    </Button>
                    <Button variant="contained" component={Link} to="Login">
                        Log in
                    </Button>
                    <IconButton sx={{ color: "white" }} >
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm">
                <Stack component="main" marginTop={2} gap={2}>
                    <Typography variant="h4" component="h2" align="center" paragraph="true">
                        Note-taking is more fun when collaborating with friends. Let's learn together!
                    </Typography>
                </Stack>
                <Stack component="form" direction="row" gap={1} justifyContent="center">
                    <IconButton sx={{ color: "black" }} >
                        <FacebookIcon />
                    </IconButton>
                    <IconButton sx={{ color: "black" }} >
                        <InstagramIcon />
                    </IconButton>
                    <IconButton sx={{ color: "black" }} >
                        <TwitterIcon />
                    </IconButton>
                    <IconButton sx={{ color: "black" }} >
                        <YouTubeIcon />
                    </IconButton>
                </Stack>
            </Container>
        </header>

    );
}