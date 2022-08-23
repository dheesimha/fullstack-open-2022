import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const blogRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blog) =>
        setBlogs(blog.sort((blog1, blog2) => blog2.likes - blog1.likes))
      );
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInBlogUser");

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);

      setUser(user);

      blogService.setToken(user.token);
    }
  }, []);
  const blogForm = () => {
    return blogs.map((blog) => {
      return (
        <div key={blog.id}>
          <Blog
            key={blog.id}
            blog={blog}
            likeIncrement={() => likeIncrement(blog.id)}
            deleteBlog={() => deleteBlog(blog.id)}
          />
          <br />
        </div>
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    window.localStorage.clear();
    window.location.reload();
  };

  const addBlog = (blogObject) => {
    blogRef.current();
    blogService
      .create(blogObject)
      .then((response) => {
        console.log(response);
        setBlogs(blogs.concat(response));
        setErrorMessage(
          `a new blog ${blogObject.title} by ${blogObject.author}`
        );

        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likeIncrement = async (id) => {
    await blogService.update(id);
    window.location.reload();
  };

  const deleteBlog = (id) => {
    let blog = blogs.filter((blog) => blog.id === id);

    if (window.confirm(`Delete ${blog[0].title} by ${blog[0].author}`))
      blogService.deleteBlog(id).then(window.location.reload());
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        Username
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    );
  };

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h1>Blogs</h1>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>{" "}
          </p>
          <Togglable buttonLabel="Add a blog" ref={blogRef} type="normalToggle">
            <BlogForm addBlog={addBlog} />
          </Togglable>

          {blogForm()}
        </div>
      )}
    </div>
  );
};

export default App;
