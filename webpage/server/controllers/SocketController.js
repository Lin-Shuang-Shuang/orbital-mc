const {findOrCreateDocument, findAll, findOrCreateMarkdown, findAllMarkdown} = require("../socketio/document");
const {verifyUser} = require("../socketio/authorization");

module.exports = {findOrCreateDocument, verifyUser, findAll, findOrCreateMarkdown, findAllMarkdown};