const {findOrCreateDocument, findAll} = require("../socketio/document");
const {verifyUser} = require("../socketio/authorization");

module.exports = {findOrCreateDocument, verifyUser, findAll};