
// Import mongoose
const mongoose = require("mongoose");
//Import database model
const userModel = require('./models/users');
//Import API
const app = require("./server.js");

const Document = require("./Document")

const io = require('socket.io')(3001, {
  cors: {
    origin:'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
})

// Connect to database for signing in
const userDbConnection = mongoose.connect("mongodb://127.0.0.1:27017/user-basic");

// Connect to database for saving text editor
const textEditorDbConnection = mongoose.createConnection("mongodb://127.0.0.1:27017/socketio-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})

//Launch server
app.listen(3002, () => {
    console.log("Server running");
});

const defaultValue = ""


//whenever we get a document id, we want to either find and load it (if it is alr in database), or create a new doc
async function findOrCreateDocument(id) {
  if (id == null) return

  let document = await Document.findById(id)
  if (!document) {
      document = await Document.create({ _id: id, data: defaultValue });
    }
    return document.toObject();
}