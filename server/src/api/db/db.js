const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_URI);

const NotesSchema = new mongoose.Schema({
  bookid: String,
  title: String,
  description: String,
});

const Notes = mongoose.model("Notes", NotesSchema);

const CommentSchema = new mongoose.Schema({
  bookid: String,
  comment: String,
});

const Comments = mongoose.model("Comments", CommentSchema);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {  
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  library: Array,
  comments: [{ type: "ObjectId", ref: "Comments" }],
  notes: [{ type: "ObjectId", ref: "Notes" }],
});

const User = mongoose.model("User", UserSchema);

const bookSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  links: Array,
  publishYear: Number,
  authorName: String,
  characters: Array,
  coverURL: String,
  description: String,
  ratingsByStars: Object,
  title: String,
  totalRating: Number
})

const Books = mongoose.model("Books", bookSchema);

module.exports = {
  User,
  Notes,
  Comments,
  Books
};
