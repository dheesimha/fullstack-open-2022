const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

mongoose.connect(process.env.MONGO_URI);

app.get("/api/blogs", (req, res) => {
  Blog.find({}).then((blogs) => res.json(blogs));
});

app.post("/api/blogs", (req, res) => {
  let newBlog = new Blog(req.body);

  newBlog.save().then((result) => {
    res.status(201).json(result);
  });
});

const PORT = 6000;

app.listen(PORT, () => {
  console.log(`Sever started on port ${PORT}`);
});
