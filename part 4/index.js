const express = require("express");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const config = require("./utils/config");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

app.listen(config.PORT, () => {
  console.log(`Sever started on port`);
});
