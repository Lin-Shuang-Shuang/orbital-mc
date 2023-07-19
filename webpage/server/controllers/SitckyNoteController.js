const Notes = require("../models/StickyNotes");
const randomstring = require("randomstring");
const jsonwebtoken = require("jsonwebtoken");
require('dotenv').config();

const notes = async (request, response) => {
    try {
        const authHeader = request.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken.decode(token);
        const user = decoded.id;
        const notes = await Notes.find({allowedUsers: user});
        response.send(notes);
    } catch (error) {
        console.log(error);
        response.status(1300).send("Error occured while fetching notes")
    }
}

const createNote = async (request, response) => {
    try {
        const {id, token, title, text} = request.body;
        const decoded = jsonwebtoken.decode(token);
        const user = decoded.id;
        const newNote = new Notes({
            _id: id,
            creator: user,
            allowedUsers: user,
            title: title,
            data: text
        })
        await newNote.save();
    } catch (error) {
        console.log(error);
        response.status(1301).send("Error occurred while creating note");
    }
}

const updateNote = async (request, response) => {
    try {
        const updatedtext = request.body;
        await Notes.findByIdAndUpdate(request.params.id, {data: updatedtext});
    } catch (error) {
        console.log(error);
        response.status(1302).send("Error occurred while updating");
    }
    
} 

const shareNote = async (request, response) => {
    try {
        const {documentId, userToShareWith} = request.body;
        const note = await Notes.findById(documentId);
        if (!note) {
            return response.status(1306).send("Note not found");
        }
        if (note.allowedUsers.includes(userToShareWith)) {
            return response.status(405).send("Note already shared with user");
        }
        note.allowedUsers.push(userToShareWith);
        await note.save();
        response.send("Successfully shared");
    } catch (error) {
        console.log(error);
        response.status(1303).send("Error occured while sharing");
    }
}

const deleteNote = async (request, response) => {
    try {
        const documentId = request.params.id;
        await Notes.deleteOne({_id: documentId});
    } catch (error) {
        console.log(error);
        response.status(1304).send("Error occured while deleting");
    }
}

module.exports = {notes, createNote, updateNote, shareNote, deleteNote};