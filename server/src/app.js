const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./api/routes/user");
const commentRouter = require("./api/routes/comment");
const noteRouter = require("./api/routes/notes");
const libraryRouter = require("./api/routes/library");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://book-nation-react.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
app.use(
  cors({
    origin: ["https://book-nation-react.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.static("./public"));
// app.use(cors())

app.get("/", (req, res) => {
  res.send("Connected");
});

app.use("/user", userRouter);
app.use("/comment", commentRouter);
app.use("/notes", noteRouter);
app.use("/library", libraryRouter);

module.exports = app;
