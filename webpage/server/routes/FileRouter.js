//Import express
const express = require('express');
//Importing methods
const { uploadWordFile, downloadWordFile, upload } = require("../controllers/UpdownloadController");
const { createFile, shareFile, deleteFile} = require("../controllers/FileController");
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
module.exports = fileRouter;