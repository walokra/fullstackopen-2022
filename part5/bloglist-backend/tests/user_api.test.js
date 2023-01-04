const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);

describe("Users", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("password", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();

    const passwordHash2 = await bcrypt.hash("password2", 10);
    const user2 = new User({ username: "user", passwordHash2 });

    await user2.save();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  describe("GET", () => {
    test("users are returned as json", async () => {
      await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("there are two users", async () => {
      const response = await api.get("/api/users");

      expect(response.body).toHaveLength(2);
    });

    test("user contains list of blogs", async () => {
      const response = await api.get("/api/users");

      response.body.forEach((user) => {
        expect(user.blogs).toBeDefined();
      });
    });
  });

  describe("POST", () => {
    test("creation succeeds with a fresh username", async () => {
      const initialUsers = await helper.getUsers();

      const newUser = {
        username: "richardroe",
        name: "Richard Roe",
        password: "hunter2",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const users = await helper.getUsers();
      expect(users).toHaveLength(initialUsers.length + 1);

      const usernames = users.map((u) => u.username);
      expect(usernames).toContain(newUser.username);
    });

    test("creation fails with status code 400 if user is invalid", async () => {
      const initialUsers = await helper.getUsers();

      const newUser = {
        username: "ro",
        password: "pa",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)
        .expect((res) => {
          expect(res.body.error).toContain("username or password too short");
        });

      const users = await helper.getUsers();
      expect(users).toHaveLength(initialUsers.length);
    });

    test("creation fails with status code 400 and message if username taken", async () => {
      const initialUsers = await helper.getUsers();

      const newUser = {
        username: "root",
        name: "Superuser",
        password: "passwordd",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)
        .expect((res) => {
          expect(res.body.error).toContain("username must be unique");
        });

      const users = await helper.getUsers();
      expect(users).toHaveLength(initialUsers.length);
    });
  });
});
