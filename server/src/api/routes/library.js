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
  const bookToFind = correctBooks.map((m) => (m.bookid = "/works/" + m.bookid));
  const findBooks = await Books.find({
    $or: [{ email: res.locals.data }, { id: { $in: [...bookToFind] } }],
  });
  res.json({ library: findBooks, bookStats: correctBooks });
});

router.post("/works/:bookId", authMiddleware, async (req, res) => {
  const alreadyAdded = await User.findOne({
    $or: [{ email: res.locals.data, library: { bookid: req.params.bookId } }],
  });
  if (alreadyAdded === null) {
    const newBook = {
      bookid: req.params.bookId,
    };
    await User.findOneAndUpdate(
      { email: res.locals.data },
      { $push: { library: newBook } }
    );
  }
  try {
    const newBook = new Books({ ...req.body });
    await newBook.save();
  } catch (err) {}
  res.json({ msg: "Added" });
});

router.post("/delete", authMiddleware, async (req, res) => {
  const bookArr = req.body.bookArr.map((b) => b.replace("/works/", ""))
  await User.updateOne(
    { email: res.locals.data },
    { $pull: { library: { bookid: { $in: bookArr } } } }
  );
  res.json("Deleted");
});

module.exports = router;
