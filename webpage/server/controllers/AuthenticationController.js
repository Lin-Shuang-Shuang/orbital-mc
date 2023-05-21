//Import mongoose
const mongoose = require("mongoose");
//Import database model
const userModel = require('../models/users');
//Import dotenv
require('dotenv').config()
//Import JsonWebToken
const JsonWebToken = require("jsonwebtoken");


//Register a new account
const register =  async (request, response) => {
    const {username, email, password} = request.body;
    try {
        const newUser = await userModel.register(username, email, password);
        await newUser.save();
        const newToken = generateToken(newUser._id);
        response.json({newToken});
    } catch (error) {
        response.json({mssg: error.message});
    }
}

//Login
const login = async (request, response) => {
    const {input, password} = request.body;
    try {
        const newUser = await userModel.login(input, password);
        const newToken = generateToken(newUser._id);
        response.json({newToken});
    } catch (error) {
        response.json({mssg: error.message});
    }
}

//Logout



//Generate JSON web token
const generateToken = (id) => {
    return JsonWebToken.sign({id}, process.env.SECRET, {expiresIn: '1d'});
}

module.exports = {register, login};