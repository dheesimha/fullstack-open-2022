import React, { useState } from "react";
import PropTypes from "prop-types";

function BlogForm({ addBlog }) {
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");

  BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
  };
  const addBlogHandler = (e) => {
    e.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    addBlog(blogObject);

    setTitle("");
    setUrl("");
    setAuthor("");
  };
  return (
    <div>
      <h1>Create a new blog</h1>
      <form onSubmit={addBlogHandler}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          id="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />

        <label htmlFor="author">Author</label>

        <input
          type="text"
          value={author}
          id="author"
          onChange={(e) => setAuthor(e.target.value)}
        />

        <br />

        <label htmlFor="url">URL</label>
        <input
          type="text"
          value={url}
          id="url"
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default BlogForm;
