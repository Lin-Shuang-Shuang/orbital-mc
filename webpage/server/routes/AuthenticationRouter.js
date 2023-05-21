//Import express
const express = require('express');
//Importing controller methods
const { register, login } = require('../controllers/AuthenticationController');
//Create router
const authRouter = express.Router();

//Register a new account
authRouter.post('/register', register);

//Login with existing account
authRouter.post('/login', login);

//Logout with existing account

module.exports = authRouter;