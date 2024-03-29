const { Router } = require("express");
const { User, Comments } = require("../db/db");
const router = Router();
const authMiddleware = require("../middlewares/Auth");

router.get("/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  const findComments = await Comments.find({ bookid: bookId });
  res.json({ comments: findComments });
});

router.get("/auth/:bookId", authMiddleware, async (req, res) => {
  const bookId = req.params.bookId;
  const findComments = await Comments.find({ bookid: bookId });
  const findUserComments = await User.find({ email: res.locals.data }, {comments: true});
  res.json({ comments: findComments, userComments: findUserComments });
});

router.post("/:bookId", authMiddleware, async (req, res) => {
  const newComment = new Comments({
    bookid: req.params.bookId,
    comment: req.body.comment,
  });
  const { _id } = await newComment.save();

  const user = await User.findOneAndUpdate(
    {
      email: res.locals.data,
    },
    {
      $push: {
        comments: _id,
      },
    }
  );
  res.json({ _id: _id });
});

router.put("/:commentId", authMiddleware, async (req, res) => {
  const commentId = req.params.commentId;
  const findComment = await User.findOne(
    { email: res.locals.data },
    { comments: true }
  );
  if (findComment.comments.length !== 0) {
    const found = findComment.comments.findIndex((c) => c == commentId);
    if (found != -1) {
      await Comments.updateOne(
        { _id: commentId },
        { comment: req.body.comment }
      );
      return res.json("Updated");
    }
  }
  res.json("Not Authorized");
});

router.delete("/:commentId", authMiddleware, async (req, res) => {
  const commentId = req.params.commentId;
  const findComment = await User.findOneAndUpdate(
    { email: res.locals.data },
    { $pull: { comments: commentId } }
  );
  if (findComment.comments.length !== 0) {
    const found = findComment.comments.findIndex((c) => c == commentId);
    if (found != -1) {
      await Comments.deleteOne({ _id: commentId });
      return res.json("Deleted");
    }
  }
  res.json("Not Authorized");
});

module.exports = router;
