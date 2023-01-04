import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import { getAll } from "./services/blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  const logout = (event) => {
    event.preventDefault();
		setUser(null);
		setBlogs([]);
    window.localStorage.clear();
  };

  const logoutForm = () => (
    <form onSubmit={logout}>
      <button type="submit">logout</button>
    </form>
  );

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      {user === null ? (
        <LoginForm onError={setErrorMessage} setUser={setUser} />
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {logoutForm()}
        </div>
      )}

      <h2>Blogs</h2>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
