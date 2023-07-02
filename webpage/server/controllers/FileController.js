const Document = require("../models/Document");
const randomstring = require("randomstring");
const jsonwebtoken = require("jsonwebtoken");
require('dotenv').config();

const createFile = async (request, response) => {
    try {
        const {token, title, text} = request.body;
        const decoded = jsonwebtoken.decode(token);
        const creator = decoded.id;
        var id = randomstring.generate(25);
        let existingdocument = await Document.findById({_id: id});
        if (existingdocument) {
            id = id + randomstring.generate(3);
        }
        const document = new Document({
            _id: id,
            creator: creator,
            allowedUsers: creator,
            title: title,
            data: {
                ops: [{insert: text}]
            }
        })
        await document.save();
        response.send("Creation successful");
    } catch (error) {
        console.log(error);
        response.status(900).send("Error occurred while creating");
    }
    
}

const shareFile = async (request, response) => {
    try {
        const {documentId, userToShareWith} = request.body;
        const document = await Document.findById(documentId);
        if (!document) {
            return response.status(404).send("Document not found");
        }
        if (document.allowedUsers.includes(userToShareWith)) {
            return response.status(400).send("Document already shared with user");
        }
        document.allowedUsers.push(userToShareWith);
        await document.save();
        response.send("Successfully shared");
    } catch (error) {
        console.log(error);
        response.status(1000).send("Error occured while sharing");
    }
}

const deleteFile = async (request, response) => {
    try {
        console.log(request.params.id);
        const documentId = request.params.id;
        await Document.deleteOne({_id: documentId});
    } catch (error) {
        console.log(error);
        response.status(1100).send("Error occured while sharing");
    }
}
module.exports = {createFile, shareFile, deleteFile};