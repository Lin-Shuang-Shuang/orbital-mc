const Document = require("../models/Document");
const MarkDown = require("../models/Markdown");
const latexModel = require("../models/LaTex");
//whenever we get a document id, we want to either find and load it (if it is alr in database), or create a new doc
async function findOrCreateDocument(id, user, title){
    if (id == null) return
  
    let document = await Document.findById({_id: id, allowedUsers: user});
    if (!document) {
        document = await Document.create({ _id: id, title: title, creator: user, allowedUsers: user, data: defaultValue });
    }
    return document.toObject();
}

//Find all documents a user has
async function findAll(user) {
    const documents = await Document.find({allowedUsers: user});
    return documents;
}

async function findAllMarkdown(user) {
    const documents = await MarkDown.find({allowedUsers: user});
    return documents;
}

async function findAllLaTex(user) {
    const documents = await latexModel.find({allowedUsers: user});
    return documents;
}

async function findOrCreateMarkdown(id, user, title) {
    if (id == null) return
    let document = await MarkDown.findById({_id: id, allowedUsers: user});
    if (!document) {
        document = await MarkDown.create({
            _id: id,
            title: title,
            creator: user,
            allowedUsers: user,
            data: "Input source code here."
        })
    }
    return document.toObject();
}

async function findOrCreateLatex(id, user, title) {
    if (id == null) return
    let document = await latexModel.findById({_id: id, allowedUserrs: user});
    if (!document) {
        document = await latexModel.create({
            _id: id,
            title: title,
            creator: user,
            allowedUsers: user,
            data: "Input source code here."
        })
    }
    return document.toObject();
}

const defaultValue = "";

module.exports = {findOrCreateDocument, findAll, findAllMarkdown, findAllLaTex, findOrCreateMarkdown, findOrCreateLatex};