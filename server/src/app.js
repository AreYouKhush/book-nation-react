const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require('./api/routes/user');
const commentRouter = require("./api/routes/comment");
const noteRouter = require("./api/routes/notes")
const libraryRouter = require('./api/routes/library')
const path = require('path');

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(express.static('./public'))
app.use(cors())

app.get("/", (req, res) => {
  res.send("Connected")
});


app.use("/user", userRouter);
app.use("/comment", commentRouter);
app.use("/notes", noteRouter);
app.use("/library", libraryRouter);

module.exports = app;