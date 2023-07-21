const mongoose = require("mongoose");

const latexTemplate = new mongoose.Schema({
  _id: String,
  title: String,
  creator: String,
  allowedUsers: [String],
  data: String,
});


const latexModel = mongoose.model("latex", latexTemplate);

module.exports = latexModel;