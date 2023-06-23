const Document = require("../models/Document");

//whenever we get a document id, we want to either find and load it (if it is alr in database), or create a new doc
async function findOrCreateDocument(id, user){
    if (id == null) return
  
    let document = await Document.findById({_id: id, allowedUsers: user});
    if (!document) {
        document = await Document.create({ _id: id, creator: user, allowedUsers: user, data: defaultValue });
    }
    return document.toObject();
}

//Find all documents a user has
async function findAll(user) {
    const documents = await Document.find({allowedUsers: user});
    return documents;
}

const defaultValue = "";

module.exports = {findOrCreateDocument, findAll};