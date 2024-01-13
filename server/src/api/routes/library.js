const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middlewares/Auth");
const { User, Books } = require("../db/db");

router.get("/", authMiddleware, async (req, res) => {
  const findLib = await User.find(
    { email: res.locals.data },
    { library: true }
  );
  let correctBooks = findLib[0].library;
  correctBooks = correctBooks.map((m) => "/works/" + m);
  const findBooks = await Books.find({
    $or: [{ email: res.locals.data }, { id: { $in: [...correctBooks] } }],
  });
  res.json({ library: findBooks });
});

router.post("/works/:bookId", authMiddleware, async (req, res) => {
  const alreadyAdded = await User.findOne({ library: req.params.bookId });
  if (alreadyAdded === null) {
    await User.findOneAndUpdate(
      { email: res.locals.data },
      { $push: { library: req.params.bookId } }
    );
  }
  try {
    const newBook = new Books({ ...req.body });
    await newBook.save();
  } catch (err) {}
  res.json({ msg: "Added" });
});

router.delete("/:bookId", authMiddleware, async (req, res) => {
  await User.updateOne(
    { email: res.locals.data },
    { $pull: { library: req.params.bookId } }
  );
  res.json("Deleted");
});

module.exports = router;
