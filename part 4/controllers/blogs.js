const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// const getTokenFrom = (req) => {
//   const authorization = req.get("authorization");
//   if (authorization && authorization.toLowerCase().startsWith("bearer")) {
//     return authorization.substring(7);
//   }

//   return null;
// };

blogsRouter.get("/", async (req, res) => {
  let blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  let body = req.body;
  // const token = getTokenFrom(req);

  const token = req.token;

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "Missing token or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  let blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes || 0,
    user: user._id,
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    return res.status(400).json({ error: "content missing" });
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;

  let blog = await Blog.findById(id);

  // let token = req.token;

  // let decodedToken = jwt.verify(token, process.env.SECRET);

  // if (decodedToken.id.toString() === blog.user.toString()) {
  if (req.user.toString() === blog.user.toString()) {
    let item = await Blog.findByIdAndDelete(id);
    res.status(204).json(item);
  } else {
    res
      .status(400)
      .json({ error: "Only the creator of the blog can delete the content" });
  }
});

blogsRouter.put("/:id", async (req, res) => {
  let id = req.params.id;

  let existingItem = await Blog.findById(id);

  existingItem.likes = req.body.likes;

  let updatedBlog = await Blog.findByIdAndUpdate(id, existingItem, {
    new: true,
    runValidators: true,
  });

  res.status(201).json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
