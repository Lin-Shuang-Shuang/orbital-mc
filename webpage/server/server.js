//Import express
const express = require("express");
//Import cors
const cors = require("cors");
//Import routers
const authRouter = require('./routes/AuthenticationRouter');
const fileRouter = require('./routes/FileRouter');
const stickyNoteRouter = require('./routes/StickyNoteRouter');
const LaTexRouter = require('./routes/LaTexRouter');

//Create and configure API
const app = express();
app.use(express.json());
app.use(cors());
//Routers
app.use('/api/authRouter', authRouter);
app.use('/api/fileRouter', fileRouter);
app.use('/api/stickyNoteRouter', stickyNoteRouter);
app.use('/api/LaTexRouter', LaTexRouter);
module.exports = app;