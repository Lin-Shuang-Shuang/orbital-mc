const mongoose = require("mongoose");

const userTemplate = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model("users", userTemplate);
module.exports = userModel;