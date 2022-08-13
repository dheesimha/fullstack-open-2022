const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ error: "Enter all the fields" });
  }

  if (username.length < 4 || password.length < 4) {
    return res.status(400).json({
      error: "Username/password length must be more than 3 characters",
    });
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({
      error: "username must be unique",
    });
  }

  const salt = 10;

  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    author: 1,
    title: 1,
    url: 1,
  });

  res.json(users);
});

// userRouter.get("/", async (req, res) => {
//   const users = await User.find({}).populate("blogs", {
//     author: 1,
//     title: 1,
//     url: 1,
//   });

//   res.json(users);
// });

module.exports = userRouter;
