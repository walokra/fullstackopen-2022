import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import { create, getAll } from "./services/blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [state, setState] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [notificationType, setNotificationType] = useState("success");

  useEffect(() => {
    if (user) {
      getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  const showMessage = (message, type = "success") => {
    setNotificationType(type);
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleError = (message, type = "error") => {
    setNotificationType(type);
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

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

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const addedBlog = await create(state);
      showMessage(`a new blog '${addedBlog.title}' by ${addedBlog.author} added`);
    } catch (error) {
      console.log(error);
      showMessage(`an error happened: ${JSON.stringify(error.response.statusText)}`);
    }

    setState({
      title: "",
      author: "",
      url: "",
    });

    const blogs = await getAll();
    setBlogs(blogs);
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const addBlogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          value={state.title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={state.author}
          name="author"
          onChange={handleChange}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={state.url}
          name="url"
          onChange={handleChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={message} type={notificationType} />

      {user === null ? (
        <LoginForm onError={handleError} setUser={setUser} />
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {logoutForm()}
        </div>
      )}

      <h2>Blogs</h2>

      {user !== null && addBlogForm()}

      <br />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
