const { Router } = require("express");
const { Books } = require("../db/db");
const router = Router();

router.get("/works/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  const result = await Books.findOne({ id: "/works/" + bookId });
  res.json({ book: result });
});

module.exports = router;
