const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

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
  beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  describe("GET", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("there are two blogs", async () => {
      const response = await api.get("/api/blogs");

      expect(response.body).toHaveLength(2);
    });

    test("all blogs are returned", async () => {
      const response = await api.get("/api/blogs");

      expect(response.body).toHaveLength(initialBlogs.length);
    });

    test("a specific blog is within the returned blogs", async () => {
      const response = await api.get("/api/blogs");

      const contents = response.body.map((r) => r.title);

      expect(contents).toContain("React patterns");
    });

    test("blog is identified by id field", async () => {
      const response = await api.get("/api/blogs");

      response.body.forEach((blog) => {
        expect(blog.id).toBeDefined();
      });
    });
  });

  describe("POST", () => {
    test("blog can be inserted", async () => {
      const newBlog = {
        title: "Way of the kings",
        author: "Brandon Sanderson",
        url: "https://google.com",
        likes: 17,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogs = await helper.getBlogs();

      expect(blogs).toHaveLength(initialBlogs.length + 1);

      const contents = blogs.map((n) => n.title);

      expect(contents).toContain("Way of the kings");
    });

    test("likes is defaulted to 0", async () => {
      const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
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

      await api.post("/api/blogs").send(invalidBlog).expect(400);
    });
  });
});
