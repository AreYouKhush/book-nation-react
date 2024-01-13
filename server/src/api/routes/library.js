const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middlewares/Auth");
const { User, Books } = require("../db/db");

router.get("/", authMiddleware, async (req, res) => {
  const findLib = await User.find(
    { email: res.locals.data },
    { library: true }
  );
  res.json({ library: findLib });
});

router.post("/works/:bookId", authMiddleware, async (req, res) => {
  await User.findOneAndUpdate({email: res.locals.data}, {$push: {library: req.params.bookId}})
  const newBook = new Books({ ...req.body });
  await newBook.save();
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
