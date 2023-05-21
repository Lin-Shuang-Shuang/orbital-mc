//Import express
const express = require("express");
//Import cors
const cors = require("cors");
//Import routers
const authRouter = require('./routes/AuthenticationRouter');

//Create and configure API
const app = express();
app.use(express.json());
app.use(cors());
//Routers
app.use('/api/authRouter', authRouter);

module.exports = app;