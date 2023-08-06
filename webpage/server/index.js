// Import mongoose
const mongoose = require("mongoose");
//Import API
const app = require("./server.js");
//Import socketController
const {
  verifyUser,
  findOrCreateDocument,
  findAll,
  findAllMarkdown,
  findOrCreateMarkdown,
  findAllLaTex,
  findOrCreateLatex
} = require("./controllers/SocketController.js");

//Set up new server for socketIO
const http = require("http");
const express = require('express');
const cors = require('cors');
const socketapp = express();
const {Server} = require("socket.io");
socketapp.use(cors());
socketapp.use(express.json());
const socketServer = http.createServer(socketapp);

const Document = require("./models/Document")
const MarkDown = require("./models/Markdown")
const LaTex = require("./models/LaTex.js")
const ioServer = new Server(socketServer, {
    maxHttpBufferSize: 1e7/2,
    cors: {
      origin:['https://orbital2.onrender.com','http://localhost:3003'],
      methods: ['GET', 'POST'],
    }
});



ioServer.use(verifyUser);
ioServer.on("connection", (socket) => {
  console.log("Connected");
  socket.on("get-document", async ({ documentId, Title }) => {
    const document = await findOrCreateDocument(documentId, socket.user, Title);
    socket.join(documentId)
    socket.emit("load-document", document.data)
    socket.emit("load-title", document.title);
    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })

  socket.on("save-title", async ({documentId, Title}) => {
    await Document.findByIdAndUpdate(documentId, { title: Title });
  })
  
  socket.on("get-all", async () => {
    if (socket.user) {
      const user = socket.user;
      const documents = await findAll(user);
      socket.emit('found-documents', documents);
    } else {
      socket.emit("Error", "Unauthorized");
    } 
  })

  socket.on("get-markdowns", async () => {
    if (socket.user) {
      const user = socket.user;
      const markdowns = await findAllMarkdown(user);
      socket.emit('found-markdown', markdowns);
    } else {
      socket.emit("Error", "Unauthorized");
    }
  })

  socket.on("get-markdown", async ({documentId, Title}) => {
    const document = await findOrCreateMarkdown(documentId, socket.user, Title);
    socket.join(documentId);
    socket.emit("load-markdown", document);
    socket.emit("title-sent", document);
    
  })

  socket.on("save-markdowntitle", async ({documentId, Title}) => {
    await MarkDown.findByIdAndUpdate(documentId, {title: Title})
    socket.broadcast.to(documentId).emit('update-title', Title);
  })
  

  socket.on("save-markdown", async ({documentId, markDown}) => {
    await MarkDown.findByIdAndUpdate(documentId, {data: markDown});
    socket.broadcast.to(documentId).emit('update-markdown', markDown);
  })

  socket.on("get-latexs", async () => {
    if (socket.user) {
      const user = socket.user;
      const latex = await findAllLaTex(user);
      socket.emit('found-latexs', latex);
    } else {
      socket.emit("Error", "Unauthorized");
    }
  })

  socket.on("get-latex", async ({documentId, Title}) => {
    const document = await findOrCreateLatex(documentId, socket.user, Title);
    socket.join(documentId);
    socket.emit("load-latex", document);
    socket.emit("title-sent-latex", document);
  })
  
  socket.on("save-latex", async ({documentId, latex}) => {
    await LaTex.findByIdAndUpdate(documentId, {data: latex});
    //Sharing to be implemented later
    //socket.broadcast.to(documentId).emit('update-latex', latex);
  })

  socket.on("save-latextitle", async({documentId, Title}) => {
    await LaTex.findByIdAndUpdate(documentId, {title:Title});
  })
  

  //error is likely caused by this
  socket.on('message', async (data) => {
    //socket.broadcast.emit('messageResponse', data);
    //Alternatively
    ioServer.emit('messageResponse', data);
  })

  socket.on('disconnect', async () => {
    console.log('A user disconnected');
  })
})

// Connect to database for signing in
const userDbConnection = mongoose.connect("mongodb+srv://starlight:starlight2015@orbitalcluster.gkxufwu.mongodb.net/user-basic");

// Connect to database for text editor
const textEditorDbConnection = mongoose.createConnection("mongodb+srv://starlight:starlight2015@orbitalcluster.gkxufwu.mongodb.net/socketio-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

//Launch server
app.listen(process.env.PORT || 3002, () => {
    console.log("Server running on 3002");
});

socketServer.listen(3003, () => {
  console.log('SocketServer running on 3003');
})

const defaultValue = ""

