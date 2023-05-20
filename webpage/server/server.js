// Import express
const express = require("express");
//Import cors
const cors = require("cors");

// Create and configure API
const app = express();
app.use(express.json());
app.use(cors());

module.exports = app;