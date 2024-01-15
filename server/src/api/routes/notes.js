const { Router } = require("express");
const { User, Notes } = require("../db/db");
const router = Router();
const authMiddleware = require("../middlewares/Auth");

router.get("/:bookId", authMiddleware, async (req, res) => {
  const bookId = req.params.bookId;
  const findAllNotes = await User.findOne(
    { email: res.locals.data },
    { notes: true }
  );
  const findBookNotes = await Notes.find({
    _id: findAllNotes.notes,
    bookid: bookId,
  });
  res.send({ notes: findBookNotes });
});

router.post("/:bookId", authMiddleware, async (req, res) => {
  const newNote = new Notes({
    bookid: req.params.bookId,
    title: req.body.title,
    description: req.body.description,
  });
  const { _id } = await newNote.save();

  await User.findOneAndUpdate(
    { email: res.locals.data },
    { $push: { notes: _id } }
  );

  res.json({ _id: _id });
});

router.put("/:noteId", authMiddleware, async (req, res) => {
  const noteId = req.params.noteId;
  const title = req.body.title;
  const description = req.body.description;
  const findNote = await User.findOne(
    { email: res.locals.data },
    { notes: true }
  );
  if (findNote.notes.length !== 0) {
    const found = findNote.notes.findIndex((c) => c == noteId);
    if (found != -1) {
      await Notes.updateOne(
        { _id: noteId },
        { title: title, description: description }
      );
      return res.json("Updated");
    }
  }
  res.json("Not Authorized");
});

router.delete("/:noteId", authMiddleware, async (req, res) => {
  const noteId = req.params.noteId;
  const findNote = await User.findOneAndUpdate(
    { email: res.locals.data },
    { $pull: { notes: noteId } }
  );
  if (findNote.notes.length !== 0) {
    const found = findNote.notes.findIndex((c) => c == noteId);
    if (found != -1) {
      await Notes.deleteOne({ _id: noteId });
      return res.json("Deleted");
    }
  }
  res.json("Not Authorized");
});

module.exports = router;
