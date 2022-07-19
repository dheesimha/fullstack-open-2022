const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likeCount = 0;

  blogs.forEach((blog) => {
    likeCount += blog.likes;
  });

  return likeCount;
};

const favoriteBlog = (blogs) => {
  let favoriteBlog = {};
  let likeCount = 0;

  blogs.forEach((blog) => {
    if (likeCount <= blog.likes) {
      favoriteBlog = blog;
      likeCount = blog.likes;
    }
  });

  return favoriteBlog;
};

const AuthorBlogPosts = (blogs) => {
  let authBlog = new Map();

  blogs.forEach((blog) => {
    let value = authBlog.get(blog.author);
    if (!value) {
      value = 1;
    } else {
      value++;
    }
    authBlog.set(blog.author, value);
  });

  let answer = {};
  let count = 0;

  authBlog.forEach((value, key) => {
    if (value >= count) {
      answer = {
        author: key,
        blogs: value,
      };

      count = value;
    }
  });

  return answer;
};

const mostLikes = (blogs) => {
  let blogMap = new Map();

  blogs.forEach((blog) => {
    let value = blogMap.get(blog.author);
    if (!value) {
      value = 0;
      value += blog.likes;
    } else {
      value += blog.likes;
    }

    blogMap.set(blog.author, value);
  });
  let answer = {};
  let count = 0;

  blogMap.forEach((value, key) => {
    if (value >= count) {
      answer = {
        author: key,
        likes: value,
      };
      count = value;
    }
  });

  return answer;
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  AuthorBlogPosts,
  mostLikes,
};
