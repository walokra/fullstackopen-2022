const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const getBlogs = async () => {
  const response = await api.get("/api/blogs");
  return response.body;
};

module.exports = {
  getBlogs,
};
