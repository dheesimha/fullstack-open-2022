const supertest = require("supertest");
const helper = require("../utils/test_helper");
const mongoose = require("mongoose");
const app = require("../index");
const api = supertest(app);
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});

  for (let singleUser of helper.users) {
    let userObj = new User(singleUser);
    await userObj.save();
  }
});

describe("Registering a user", () => {
  test("user not regsitered when all the fields are not filled", async () => {
    let user = {
      password: "heyyy",
      name: "Akash",
    };

    await api.post("/api/users").send(user).expect(400);
  });

  test("user not registered with an existing username", async () => {
    let user = {
      username: "dhee",
      name: "dheemanth",
      password: "password",
    };

    await api.post("/api/users").send(user).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
