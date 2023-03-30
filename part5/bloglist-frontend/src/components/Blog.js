import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
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
      <div style={showWhenVisible}>
        {blog.url}<br />
        likes: {blog.likes}<br />
        {blog.user ? blog.user.name : "unknown user"}
      </div>
      <button onClick={toggleVisibility}>view</button>
    </div>
  );
};

export default Blog;
