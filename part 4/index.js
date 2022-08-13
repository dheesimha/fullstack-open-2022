const express = require("express");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const userRouter = require("./controllers/users");
const mongoose = require("mongoose");
const loginRouter = require("./controllers/login");
require("express-async-errors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(config.MONGO_URI)
  .then(console.log("Connected to DB"))
  .catch((err) => {
    console.error(err);
  });

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(
  "/api/blogs",
  middleware.tokenExtractor,
  middleware.userExtractor,
  blogsRouter
);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  console.log(`Sever started on port`);
});

module.exports = app;
