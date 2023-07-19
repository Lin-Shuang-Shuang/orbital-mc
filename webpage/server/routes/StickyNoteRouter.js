//Import express
const express = require('express');
// Creating router
const stickyNoteRouter = express.Router();
//Importing methods
const {notes, createNote, updateNote, shareNote, deleteNote} = require("../controllers/SitckyNoteController");

//Fetch all sticky notes
stickyNoteRouter.get('/notes', notes);
//Create a sticky note
stickyNoteRouter.post('/createNote', createNote);
//Share a sticky note
stickyNoteRouter.post('/shareNote', shareNote);
//Update a sticky note
stickyNoteRouter.put(`/deleteNote/:id`, updateNote);
//Delete a sticky note
stickyNoteRouter.post(`/deleteNote/:id`, deleteNote);

module.exports = stickyNoteRouter;