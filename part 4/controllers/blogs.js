const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", async (req, res) => {
  let blogs = await Blog.find({});

  res.status(200).json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  let body = req.body;

  let blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes || 0,
  });

  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    return res.status(400).json({ error: "content missing" });
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;

  let item = await Blog.findByIdAndDelete(id);

  res.status(204).json(item);
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
