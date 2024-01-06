const { Router } = require("express");
const { User, Notes } = require("../db/db");
const router = Router();
const authMiddleware = require("../middlewares/Auth");

router.get("/:bookId", authMiddleware, async (req, res) => {
  const bookId = req.params.bookId;
  const findAllNotes = await User.findOne(
    { username: res.locals.data },
    { notes: true }
  );
  const findBookNotes = await Notes.find({_id: findAllNotes.notes, bookid: bookId})
  res.send({notes: findBookNotes});
});

router.post("/:bookId", authMiddleware, async (req, res) => {
  const newNote = new Notes({
    bookid: req.params.bookId,
    title: req.body.title,
    description: req.body.description,
  });
  const { _id } = await newNote.save();

  await User.findOneAndUpdate(
    { username: res.locals.data },
    { $push: { notes: _id } }
  );
  res.json("Success");
});

router.put("/:commentId", authMiddleware, async (req, res) => {
  const commentId = req.params.commentId;
  const findComment = await User.findOne(
    { username: res.locals.data },
    { comments: true }
  );
  if (findComment.comments.length !== 0) {
    const found = findComment.comments.findIndex((c) => c == commentId);
    if (found != -1) {
      await Notes.updateOne(
        { _id: req.params.commentId },
        { comment: req.body.comment }
      );
    }
    return res.json("Updated");
  }
  res.json("Not Authorized");
});

router.delete("/:commentId", authMiddleware, async (req, res) => {
  const commentId = req.params.commentId;
  await Notes.deleteOne({ _id: commentId });
  await User.findOneAndUpdate(
    { username: res.locals.data },
    { $pull: { comments: commentId } }
  );
  res.json("Deleted");
});

module.exports = router;
