const { Router } = require("express");
const { Books, User } = require("../db/db");
const authMiddleware = require("../middlewares/Auth");
const router = Router();

router.get("/works/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  const result = await Books.findOne({ id: "/works/" + bookId });
  res.json({ book: result });
});

router.get("/read/:bookId", authMiddleware, async (req, res) => {
  const findIfRead = await User.findOne(
    { email: res.locals.data },
    { library: true }
  );
  res.json(findIfRead);
});

router.post("/read/:bookId", authMiddleware, async (req, res) => {
  const isRead = req.body.isRead;
  let { library } = await User.findOne(
    { email: res.locals.data },
    { library: true }
  );
  let newBook = library.find((l) => l.bookid === req.params.bookId);
  newBook.read = true;
  const response = await User.updateOne(
    {
      email: res.locals.data,
      "library.bookid": req.params.bookId,
    },
    {
      $set: {
        "library.$.read": !isRead,
      },
    }
  );
  res.json(response);
});

module.exports = router;
