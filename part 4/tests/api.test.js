const supertest = require("supertest");
const helper = require("../utils/test_helper");
const mongoose = require("mongoose");
const app = require("../index");
const api = supertest(app);
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.blogItems) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.length).toHaveLength(helper.blogItems.length);
});

test("An entry has id property", async () => {
  const response = await api.get("/api/blogs");

  const content = response.body[0];

  expect(content.id).toBeDefined();
});

describe("addition of a blog", () => {
  let token;

  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("testing", 10);
    const user = new User({ username: "testing", passwordHash });

    await user.save();

    const response = await api
      .post("/api/login")
      .send({ username: "testing", password: "testing" });

    token = response.body.token;
  });
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Blog 12",
      author: "Dheemath33",
      url: "blog.com/dheemanth",
      likes: 10,
      user: "62f73793efab8d5964a799b7",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogList = await helper.blogsInDb();

    let particularBlog = blogList.filter(
      (blog) => blog.title === newBlog.title
    );

    expect(particularBlog[0].likes).toEqual(newBlog.likes);

    expect(blogList).toHaveLength(helper.blogItems.length + 1);
  });

  test("a valid blog can be added with zero likes", async () => {
    const newBlog = {
      title: "Blog 12",
      author: "Dheemath33",
      url: "blog.com/dheemanth",
      user: "62f73793efab8d5964a799b7",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "Bearer ${token}")
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogList = await helper.blogsInDb();

    let particularBlog = await blogList.filter(
      (blog) => blog.title === newBlog.title
    );

    expect(particularBlog[0].likes).toEqual(0);

    expect(blogList).toHaveLength(helper.blogItems.length + 1);
  });

  test("a blog with no title and url returns 400 error", async () => {
    let item = {
      likes: 10,
    };

    await api.post("/api/blogs").send(item).expect(400);
  });
});

describe("Deletion of a blog", () => {
  test("succeeds with status 204 if id is valid", async () => {
    const initalBlogs = await helper.blogsInDb();
    const itemToBeDeleted = initalBlogs[0];

    await api.delete(`/api/blogs/${itemToBeDeleted.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.blogItems.length - 1);

    const contents = blogsAtEnd.map((r) => r.id);

    expect(contents).not.toContain(itemToBeDeleted.id);
  });
});

describe("Updating an individual blog", () => {
  test("Updating a single blog", async () => {
    const initalBlogs = await helper.blogsInDb();
    const updatedBlog = initalBlogs[0];

    let initialLikes = updatedBlog.likes;

    updatedBlog.likes = 4000;

    await api.put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog).expect(201);

    let blogsAtEnd = await helper.blogsInDb();

    let firstBlogAfterUpdate = blogsAtEnd[0].likes;

    expect(firstBlogAfterUpdate).not.toEqual(initialLikes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
