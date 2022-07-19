const mongoose = require("mongoose");
const config = require("../utils/config");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

mongoose
  .connect(config.MONGO_URI)
  .then(console.log("Connected to DB"))
  .catch((err) => {
    console.error(err);
  });

module.exports = Blog;
