const mongoose = require("mongoose");

const fileTemplate = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
});

fileTemplate.statics.createNew = async function(user, filename, path) {
  const newFile = this.create({user, filename, path});
  return newFile;
}

const fileModel = mongoose.model("files", fileTemplate);

module.exports = fileModel;
