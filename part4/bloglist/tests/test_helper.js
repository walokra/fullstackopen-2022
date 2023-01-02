const User = require("../models/user");
const Blog = require("../models/blog");

const getBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

const getBlog = async (id) => {
  const blogs = await Blog.findById(id);
  return blogs.map((b) => b.toJSON());
};

const getUsers = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  getBlogs,
  getBlog,
  getUsers,
};
