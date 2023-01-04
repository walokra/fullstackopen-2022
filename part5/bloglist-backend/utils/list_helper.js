const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return array.reduce(reducer, 0);
};

const favoriteBlog = (array) => {
  return array.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });
};

const mostBlogs = (array) => {
  const grouped = _.chain(array)
    .groupBy("author")
    .map((value, key) => ({ author: key, blogs: value }))
    .value();

  const ordered = _.chain(grouped)
    .map((a) => ({ author: a.author, blogs: a.blogs.length }))
    .orderBy("blogs", "desc")
    .value();

  return ordered[0];
};

const mostLikes = (array) => {
  const grouped = _.chain(array)
    .groupBy("author")
    .map((value, key) => ({ author: key, blogs: value }))
    .value();

  const ordered = _.chain(grouped)
    .map((a) => ({ author: a.author, likes: totalLikes(a.blogs) }))
    .orderBy("likes", "desc")
    .value();

  return ordered[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
