//stores all the data/changes to the document in a database
const { Schema, model } = require("mongoose")

const Document = new Schema({
  _id: String,
  title: String,
  creator: String,
  allowedUsers: [String],
  data: Object,
})

module.exports = model("Document", Document)