const mongoose = require("mongoose");

const noteTemplate = new mongoose.Schema({
  _id: String,
  title: String,
  creator: String,
  allowedUsers: [String],
  data: String,
});


const noteModel = mongoose.model("notes", noteTemplate);

module.exports = noteModel;