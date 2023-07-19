const fs = require("fs");
const multer = require("multer");
const mammoth = require("mammoth");
const Document = require("../models/Document");
const Markdown = require("../models/Markdown");
const path = require("path");
const officegen = require("officegen");
const MarkdownPDF = require("markdown-pdf");
const randomstring = require("randomstring");
const jsonwebtoken = require("jsonwebtoken");


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
    if (ext !== ".doc" && ext !== ".docx" && ext !== ".txt" && ext !== ".md") {
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

const uploadMarkdown = async (request, response) => {
    try {
        const authHeader = request.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken.decode(token);
        const creator = decoded.id;
        var id = randomstring.generate(25);
        let existingdocument = await Markdown.findById({_id: id});
        if (existingdocument) {
            id = id + randomstring.generate(3);
        }
        const data = fs.readFileSync(request.file.path, 'utf-8');
        const document = new Markdown({_id: id, title: request.file.originalname, creator: creator,
            allowedUsers: creator, data: data});
        await document.save();
        fs.unlinkSync(request.file.path);
    } catch (error) {
        console.log(error);
        response.status(701).send("Error occurred while uploading");
    }
}

const exportMarkdown = async (request, response) => {
    try {
        const document = await Markdown.findById(request.params.id);
        if (!document) {
            return response.status(404).send("Not found");
        }
        const mdString = document.data;
        MarkdownPDF().from.string(mdString).to.buffer({}, (error, buffer) => {
            if (error) {
                console.log(error);
                return response.status(405).send("Error during conversion")
            }
            response.setHeader("Content-Type", "application/pdf");
            response.setHeader(
                "Content-Disposition",
                'inline; filename="' + document.title + '.pdf "'
            );
            response.send(buffer);
        })
    } catch (error) {
        response.status(406).send("Error occured while converting and downloading");
    }
}

const downloadMarkdown = async (request, response) => {
    try {
        const document = await Markdown.findById(request.params.id);
        if (!document) {
            return response.status(404).send("Not found");
        }
        const safefileTitle = document.title.replace(/[^a-z0-9]/gi, '_');
        const file = `${safefileTitle}.md`;
        fs.writeFileSync(file, document.data);
        response.download(file, (error) => {
            if (error) {
                console.log(error);
            }
            fs.unlinkSync(file);
        });
    } catch (error) {
        console.log(error);
        return response.status(407).send("Error occured while downloading markdown file");
    }
}

module.exports = {
    uploadWordFile,
    downloadWordFile,
    upload,
    uploadMarkdown,
    exportMarkdown,
    downloadMarkdown
}