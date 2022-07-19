const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);

  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs);

    expect(result).toBe(0);
  });

  test("when list has only one blog post likes equals to that", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(blogs);

    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(blogs);

    expect(result).toBe(20);
  });
});

describe("favorite blog", () => {
  test("there are no blogs", () => {
    let blogs = [];

    let result = listHelper.favoriteBlog(blogs);

    expect(result).toEqual({});
  });

  test("when there is 1 blog", () => {
    let blogs = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      },
    ];

    let result = listHelper.favoriteBlog(blogs);

    expect(result).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    });
  });

  test("when there is a list of blogs", () => {
    let blogs = [
      {
        title: " Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      },
      {
        title: "Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 6,
      },
      {
        title: "To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 10,
      },
      {
        title: "Go ",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
      },
    ];

    const result = listHelper.favoriteBlog(blogs);

    expect(result).toEqual({
      title: "To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
    });
  });
});

describe("author with the highest number of blogs", () => {
  test("when there are no blogs", () => {
    let blogs = [];

    const result = listHelper.AuthorBlogPosts(blogs);

    expect(result).toEqual({});
  });

  test("When there is only one blog", () => {
    let blogs = [
      {
        title: "Go ",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
      },
    ];

    const result = listHelper.AuthorBlogPosts(blogs);

    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("when there is a list of blogs", () => {
    let blogs = [
      {
        title: "Go ",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
      },
      {
        title: "Go ",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
      },
      {
        title: "Go ",
        author: "E W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
      },
      {
        title: "Go ",
        author: "E W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
      },
      {
        title: "Go ",
        author: "E W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
      },
    ];

    const result = listHelper.AuthorBlogPosts(blogs);
    expect(result).toEqual({
      author: "E W. Dijkstra",
      blogs: 3,
    });
  });
});

describe("author with the most number of likes on their blogs", () => {
  test("when there are no blogs", () => {
    let blogs = [];
    let result = listHelper.mostLikes(blogs);

    expect(result).toEqual({});
  });

  test("when there is 1 blog", () => {
    let blogs = [
      {
        title: "Go ",
        author: "E W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
      },
    ];
    let result = listHelper.mostLikes(blogs);

    expect(result).toEqual({ author: "E W. Dijkstra", likes: 2 });
  });

  test("when there are many blogs", () => {
    let blogs = [
      {
        title: "Go ",
        author: "E W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
      },
      {
        title: "Go ",
        author: "E W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
      },
      {
        title: "Go ",
        author: "E W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
      },
      {
        title: "Go ",
        author: "E. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 21,
      },
    ];
    let result = listHelper.mostLikes(blogs);

    expect(result).toEqual({ author: "E. Dijkstra", likes: 21 });
  });
});
