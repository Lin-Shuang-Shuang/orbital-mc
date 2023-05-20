
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

/**
 * Requests
 */

//App request: Get all users from collection
app.get("/getUsers", (request, response) => {
    userModel.find().then((data) => response.json(data));
});

//App request: Creates a new user
app.post("/createUser", async (request, response) => {
    const user = request.body;
    const newUser = new userModel(user);
    await newUser.save();
    response.json(user);
});



