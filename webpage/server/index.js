
// Import mongoose
const mongoose = require("mongoose");
//Import database model
const userModel = require('./models/users');
//Import API
const app = require("./server.js");

// Connect to database
mongoose.connect("mongodb://127.0.0.1:27017/user-basic");

//Launch server
app.listen(3002, () => {
    console.log("Server running");
});


