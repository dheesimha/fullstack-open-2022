const Blog = require("../models/blog");

const blogItems = [
  {
    title: "Blog 1",
    author: "Dheemath",
    url: "blog.com/dheemanth",
    likes: 10,
  },
  {
    title: "Blog 2",
    author: "Sahas",
    url: "blog.com/sahas",
    likes: 20,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((element) => element.toJSON());
};

module.exports = {
  blogItems,
  blogsInDb,
};
