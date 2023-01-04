import { useState, useEffect } from "react";
import { setToken } from "../services/blogs";
import { login } from "../services/login";

const LoginForm = ({ setUser, onError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, [setUser]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login({
        username,
        password,
      });

      window.localStorage.setItem("user", JSON.stringify(user));

      setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      onError("wrong credentials");
      setTimeout(() => {
        onError(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
