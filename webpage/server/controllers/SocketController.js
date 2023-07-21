const {findOrCreateDocument, findAll, findOrCreateMarkdown, findAllMarkdown, findAllLaTex, findOrCreateLatex} = require("../socketio/document");
const {verifyUser} = require("../socketio/authorization");

module.exports = {findOrCreateDocument, verifyUser, findAll, findOrCreateMarkdown, findAllMarkdown, findAllLaTex, findOrCreateLatex};