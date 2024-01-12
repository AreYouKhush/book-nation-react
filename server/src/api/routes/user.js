const { Router } = require("express");
const { User } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/Auth");
const router = Router();
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

router.get("/auth", authMiddleware, (req, res) => {
  res.send({ msg: "Success" });
});

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const findUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (findUser) {
    res.send({ msg: "User already exists" });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    res.send({ msg: "Success" });
  }
});

router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const findUser = await User.findOne({ email: email });
  if (findUser) {
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (isMatch) {
      const token = jwt.sign({ email }, jwtSecret);
      res.send({ token: token });
    } else {
      res.send({ msg: "Incorrect Password" });
    }
  } else {
    res.send({ msg: "User Does not exist" });
  }
});

module.exports = router;
