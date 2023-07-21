const express = require('express');
const {createOrUpdateLatexFile, compileToPDF, shareLatex, deleteLaTex} = require("../controllers/LaTexController");

const LaTexRouter = express.Router();

//Create or save document
LaTexRouter.post('/createOrUpdateLatexFile', createOrUpdateLatexFile);

//Compile Latex document to PDF
LaTexRouter.get(`/compileToPDF/:id`, compileToPDF);

//Share Latex document
LaTexRouter.post('/shareLatex', shareLatex);

//Delete Latex document
LaTexRouter.post(`/deleteLatex/:id`, deleteLaTex);

module.exports = LaTexRouter;