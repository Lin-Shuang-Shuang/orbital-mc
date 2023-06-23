// Import mongoose
const mongoose = require("mongoose");
//Import API
const app = require("./server.js");
//Import socketController
const {
  verifyUser,
  findOrCreateDocument,
  findAll
} = require("./controllers/SocketController.js");

const Document = require("./models/Document")
const ioServer = require("socket.io")(3003, {
  cors: {
    origin:'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

ioServer.use(verifyUser);
ioServer.on("connection", (socket) => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId, socket.user)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })

    socket.on("get-all", async () => {
      if (socket.user) {
        const user = socket.user;
        const documents = await findAll(user);
        socket.emit("documents", documents);
      } else {
        socket.emit("Error", "Unauthorized");
      } 
    })
    console.log("success");
  })
})

// Connect to database for signing in
const userDbConnection = mongoose.connect("mongodb://127.0.0.1:27017/user-basic");

// Connect to database for text editor
const textEditorDbConnection = mongoose.createConnection("mongodb://127.0.0.1:27017/socketio-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

//Launch server
app.listen(3002, () => {
    console.log("Server running on 3002");
});

const defaultValue = ""

