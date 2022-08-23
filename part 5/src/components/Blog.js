import Togglable from "./Togglable";
const jwt = require("jsonwebtoken");

const Blog = (props) => {
  const handleLike = (id) => {
    return props.likeIncrement(id);
  };

  const handleDelete = (id) => {
    return props.deleteBlog(id);
  };

  let tokenReq = JSON.parse(localStorage.getItem("loggedInBlogUser"));
  let token = tokenReq.token;

  let decodedToken = jwt.decode(token, process.env.REACT_APP_SECRET);
  let decodedId = decodedToken.id;

  if (decodedId === props.blog.user.id) {
    return (
      <div className="blogItems" style={{ border: "2px solid black" }}>
        {props.blog.title} {props.blog.author}
        <Togglable buttonLabel="view" type="divToggle" className="expand">
          <p>{props.blog.url}</p>
          <p>
            Likes:{props.blog.likes}
            <button onClick={() => handleLike(props.blog.id)}>Like</button>
          </p>
          <p>{props.blog.user.name}</p>
          <button
            onClick={() => handleDelete(props.blog.id)}
            style={{ backgroundColor: "lightblue" }}
          >
            Delete
          </button>
        </Togglable>
        <br />
      </div>
    );
  } else
    return (
      <div className="blogItems" style={{ border: "2px solid black" }}>
        {props.blog.title} {props.blog.author}
        <Togglable buttonLabel="view" type="divToggle">
          <p>{props.blog.url}</p>
          <p>
            Likes:{props.blog.likes}
            <button onClick={() => handleLike(props.blog.id)}>Like</button>
          </p>
          <p>{props.blog.user.name}</p>
        </Togglable>
        <br />
      </div>
    );
};

export default Blog;
