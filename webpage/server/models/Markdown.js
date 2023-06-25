const mongoose = require("mongoose");

const markdownTemplate = new mongoose.Schema({
  _id: String,
  title: String,
  creator: String,
  allowedUsers: [String],
  data: String,
});


const markdownModel = mongoose.model("markdown", markdownTemplate);

module.exports = markdownModel;
