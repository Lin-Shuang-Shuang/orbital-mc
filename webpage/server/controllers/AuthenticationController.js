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
        response.status(200).send("Successful registration")
    } catch (error) {
        response.status(500).send({message: error.message});
    }
}

//Login
const login = async (request, response) => {
    const {input, password} = request.body;
    try {
        const newUser = await userModel.login(input, password);
        const newToken = generateToken(newUser.username);
        response.status(200).json({newToken})
    } catch (error) {
        response.status(500).send({message: error.message});
    }
}


//Generate JSON web token
const generateToken = (id) => {
    const token = JsonWebToken.sign({id}, process.env.SECRET, {expiresIn: '1d'});
    return token;
}

module.exports = {register, login};