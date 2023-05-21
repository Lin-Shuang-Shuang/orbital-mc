// Importing mongoose
const mongoose = require("mongoose");
// Importing bcrypt
const bcrypt = require("bcrypt");
// Importing validator
const validator = require("validator");

const userTemplate = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//Register
userTemplate.statics.register = async function(username, email, password) 
    {
        //Validation of request
        if (!username || !email || !password) {
            throw Error("Cannot have empty fields.");
        } else if (!validator.isEmail(email)) {
            throw Error("Invalid email.");
        }

        /* To-do
        if (!validator.isStrongPassword(password)) {
            throw Error("Password not strong enough.");
        }
        */

        const usernameExists = await this.findOne({username});
        const emailExists = await this.findOne({email});

        if (usernameExists) {
            throw Error("Username already exists.");
        } else if (emailExists) {
            throw Error("Email already exists.");
        }

        //Hashing password
        const randPass = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(password, randPass);
        
        //Create new user
        const newUser = await this.create({username, email, password: hashedPassword});
        return newUser;
    }   

//Login
userTemplate.statics.login = async function(input, password) {
    if (!input || !password) {
        throw Error("Cannot have empty fields.");
    }
    if (validator.isEmail(input)) {
        const userExists = await this.findOne({email: input});
        if (!userExists) {
            throw Error("Incorrect email");
        }
        const passwordMatch = await bcrypt.compare(password, userExists.password);
        if (!passwordMatch) {
            throw Error("Incorrect password");
        }
        return userExists;
    }
    const userExists = await this.findOne({username: input});
    if (!userExists) {
        throw Error("Incorrect username");
    }
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) {
        throw Error("Incorrect password");
    }
    return userExists;
}

const userModel = mongoose.model("users", userTemplate);
module.exports = userModel;