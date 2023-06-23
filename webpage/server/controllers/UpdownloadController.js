const fs = require("fs");
const multer = require("multer");
const mammoth = require("mammoth");
const Document = require("../models/Document");
const path = require("path");
const officegen = require("officegen");

const multerStorage = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, "./uploads");
    },
    filename: function(request, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const multerFilter = (request, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".doc" && ext !== ".docx" && ext !== ".txt") {
        return cb(null, false, new Error("Only .doc and .docx files are allowed."));
    }
    cb(null, true);
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

const uploadWordFile = async (request, response) => {
    try {
        const result = await mammoth.extractRawText({path: request.file.path});
        const title = path.basename(request.file.originalname, path.extname(request.file.originalname));
        response.json({
            title: title,
            data: result.value,
        });
    } catch (error) {
        console.log(error);
        response.status(700).send("Error occurred while uploading");
    }
}

const downloadWordFile = async (request, response) => {
    try {
        const document = await Document.findById(request.params.id);
        if (!document) {
            return response.status(404).send("Not found");
        }
        const download = officegen('docx');
        download.createP().addText(document.data.ops[0].insert);
        
        response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        response.setHeader('Content-Disposition', `attachment; filename=${document.title}.docx`);
        download.generate(response);
    } catch (error) {
        response.status(800).send("Error occured while downloading");
    }
}

module.exports = {
    uploadWordFile,
    downloadWordFile,
    upload
}