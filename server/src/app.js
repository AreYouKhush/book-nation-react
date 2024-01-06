const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require('./api/routes/user');
const commentRouter = require("./api/routes/comment");
const noteRouter = require("./api/routes/notes")

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(cors())

app.get("/", (req, res) => {
  res.json({ Message: "Connected" });
});

app.use("/user", userRouter);
app.use("/comment", commentRouter);
app.use("/notes", noteRouter);

module.exports = app;