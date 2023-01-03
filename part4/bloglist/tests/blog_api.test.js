const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
];

describe("blogs", () => {
  let token;

  beforeEach(async () => {
    await User.deleteMany({});
    const username = "root";
    const password = "password";
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, passwordHash });
    await user.save();

    const response = await api
      .post("/api/login")
      .send({ username, password })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    token = response.body.token;

    await Blog.deleteMany({});
    let blogObject = new Blog({ ...initialBlogs[0], user: user._id });
    await blogObject.save();
    blogObject = new Blog({ ...initialBlogs[1], user: user._id });
    await blogObject.save();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  describe("GET", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("there are two blogs", async () => {
      const response = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${token}`);

      expect(response.body).toHaveLength(2);
    });

    test("all blogs are returned", async () => {
      const response = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${token}`);

      expect(response.body).toHaveLength(initialBlogs.length);
    });

    test("a specific blog is within the returned blogs", async () => {
      const response = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${token}`);

      const contents = response.body.map((r) => r.title);

      expect(contents).toContain("React patterns");
    });

    test("blog is identified by id field", async () => {
      const response = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${token}`);

      response.body.forEach((blog) => {
        expect(blog.id).toBeDefined();
      });
    });
  });

  describe("POST", () => {
    test("blog can be inserted", async () => {
      const users = await helper.getUsers();

      const newBlog = {
        title: "Way of the kings",
        author: "Brandon Sanderson",
        url: "https://google.com",
        likes: 17,
        userId: users[0]._id,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogs = await helper.getBlogs();

      expect(blogs).toHaveLength(initialBlogs.length + 1);

      const contents = blogs.map((n) => n.title);

      expect(contents).toContain("Way of the kings");
    });

    test("likes is defaulted to 0", async () => {
      const users = await helper.getUsers();

      const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        userId: users[0]._id,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(201)
        .expect((res) => {
          expect(res.body.likes).toBe(0);
        })
        .expect("Content-Type", /application\/json/);
    });

    test("fails with status code 400 if title and url is missing", async () => {
      const invalidBlog = {
        author: "Robert C. Martin",
      };

      await api
        .post("/api/blogs")
        .send(invalidBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
    });

    test("fails with status code 401 if no token", async () => {
      await api
        .post("/api/blogs")
        .send({})
        .set("Authorization", `Bearer`)
        .expect(401);
    });
  });

  describe("DELETE", () => {
    test("returns status code 204 if succeeded", async () => {
      const initialBlogs = await helper.getBlogs();
      const blogToDelete = initialBlogs[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const blogs = await helper.getBlogs();

      expect(blogs).toHaveLength(initialBlogs.length - 1);

      const contents = blogs.map((r) => r.title);

      expect(contents).not.toContain(blogToDelete.title);
    });
  });

  describe("PUT", () => {
    test("blog likes can be updated", async () => {
      const initialBlogs = await helper.getBlogs();
      const blogToUpdated = initialBlogs[0];
      blogToUpdated.likes = 100;

      await api
        .put(`/api/blogs/${blogToUpdated.id}`)
        .send(blogToUpdated)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.likes).toBe(100);
        });
    });
  });
});
