//Import express
const express = require('express');
//Importing methods
const { uploadWordFile, downloadWordFile, upload, uploadMarkdown, exportMarkdown, downloadMarkdown } = require("../controllers/UpdownloadController");
const { createFile, shareFile, deleteFile, shareMarkdown, deleteMarkdown} = require("../controllers/FileController");
//Creating router
const fileRouter = express.Router();

//Upload
fileRouter.post('/uploadword', upload.single('file'), uploadWordFile);

//Download
fileRouter.get(`/downloadword/:id`, downloadWordFile);

//Create a file
fileRouter.post('/createFile', createFile);

//Delete a word file
fileRouter.post(`/deleteFile/:id`, deleteFile);

//Share a file with another user
fileRouter.post('/shareFile', shareFile);

//Upload a markdown file
fileRouter.post('/uploadMarkdown', upload.single('file'), uploadMarkdown);

//Export a markdown file as pdf
fileRouter.get(`/exportMarkdown/:id`, exportMarkdown);

//Download a markdown file
fileRouter.get(`/downloadMarkdown/:id`, downloadMarkdown);

//Share a markdown file with another user
fileRouter.post('/shareMarkdown', shareMarkdown);

//Delete a markdown file
fileRouter.post(`/deleteMarkdown/:id`, deleteMarkdown)
module.exports = fileRouter;