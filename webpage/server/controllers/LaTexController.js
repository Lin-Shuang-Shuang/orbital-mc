const LaTex = require("../models/LaTex");
const fs = require('fs');
const bodyParser = require('body-parser');
const { exec, execSync } = require('child_process');
const jsonwebtoken = require('jsonwebtoken');
const Latex = require('node-latex')
const path = require('path');

const createOrUpdateLatexFile = async (request, response) => {
    try {
        console.log(request.body);
        const {documentId, title, token, latex} = request.body;
        let existingdocument = LaTex.findById(documentId);
        if (!existingdocument) {
            const decoded = jsonwebtoken.decode(token);
            const creator = decoded.id;
            const document = await LaTex.create({
                _id: documentId,
                creator: creator,
                allowedUsers: creator,
                title: title,
                data: latex
            })
            await document.save();
        }
    } catch (error) {
        console.log(error);
        response.status(1400).send("Error occured while creating/saving LaTeX document");
    }
}

const compileToPDF = async (request, response) => {
    const document = await LaTex.findById(request.params.id);
    if (!document) {
        return response.status(1401).send("Not found");
    }
    const latex = document.data;
    const texPath = path.join('C:', 'texlive', '2023', 'bin', 'windows', 'temp.tex');
    fs.writeFileSync(texPath, latex);
    try {
        execSync(`C:\\texlive\\2023\\bin\\windows\\pdflatex.exe ${texPath}`);
        const pdf = fs.readFileSync(`temp.pdf`);
        response.setHeader(
            "Content-Disposition",
            'inline; filename="' + document.title + '.pdf "'
        );
        response.contentType("application/pdf");
        response.send(pdf);
    } catch (error) {
        console.log(error);
        response.send('Failed to compile LaTex');
    }
}

const shareLatex = async (request, response) => {
    try {
        const {documentId, userToShareWith} = request.body;
        const document = await LaTex.findById(documentId);
        if (!document) {
            return response.status(1401).send("Document not found");
        }
        if (document.allowedUsers.includes(userToShareWith)) {
            return response.status(1403).send("Document already shared with user");
        }
        document.allowedUsers.push(userToShareWith);
        await document.save();
        response.send("Successfully shared");
    } catch (error) {
        console.log(error);
        response.status(1404).send("Error occured while sharing");
    }
}

const deleteLaTex = async (request, response) => {
    try {
        const documentId = request.params.id;
        await LaTex.deleteOne({_id: documentId});
    } catch (error) {
        console.log(error);
        response.status(1405).send("Error occured while deleting");
    }
}

module.exports = {createOrUpdateLatexFile, compileToPDF, shareLatex, deleteLaTex};
