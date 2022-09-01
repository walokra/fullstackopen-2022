const mongoose = require("mongoose");
const supertest = require("supertest");
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

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Note(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Note(initialBlogs[1]);
  await blogObject.save();
});

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

test("all notes are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);

  expect(contents).toContain("First class test");
});

afterAll(() => {
  mongoose.connection.close();
});
