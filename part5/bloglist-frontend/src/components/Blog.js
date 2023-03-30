import { useState } from "react";

const Blog = ({ key, blog, updateBlog }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const likeBlog = (event) => {
    event.preventDefault();
    updateBlog({ ...blog, likes: blog.likes + 1 });
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      &nbsp;{" "}
      <button onClick={toggleVisibility}>{visible ? `hide` : `view`}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes: {blog.likes} <button onClick={likeBlog}>like</button>
        <br />
        {blog.user ? blog.user.name : "unknown user"}
      </div>
    </div>
  );
};

export default Blog;
