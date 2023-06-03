import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Container } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import {useNavigate} from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
export default function Home() {
    const navigate = useNavigate();

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };

    return (
        <header>
        <ThemeProvider theme={theme}>
            <AppBar position="relative" >
                <Toolbar>
                    <Typography variant="h6" component="h1" flexGrow={1}>
                        NoTiFy
                    </Typography>
                    <Button variant="contained" component={Link} to="Register" >
                        Register
                    </Button>
                    <Button variant="contained" component={Link} to="Login" >
                        Log in
                    </Button>
                    <IconButton sx={{ color: "white" }} >
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            </ThemeProvider>
            <Carousel
              swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}

                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}

                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px">

              <div className="carousel-mainpage1">
                <img className="carousel-firstpage" src={require('../images/mainpage_1.png')} alt="first page" />
              </div>
              <div className="carousel-mainpage2">
                              <img className="carousel-secpage" src={require('../images/mainpage_2.png')} alt="first page" />
                            </div>
              <div className="carousel-mainpage3">
                              <img className="carousel-thirdpage" src={require('../images/mainpage_3.png')} alt="first page" />
                            </div>
              <div className="carousel-mainpage4">
                              <img className="carousel-forthpage" src={require('../images/mainpage_4.png')} alt="first page" />
                            </div>
            </Carousel>;
            <Container maxWidth="sm">

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