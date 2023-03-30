import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { setToken } from '../services/blogs'
import { login } from '../services/login'

const LoginForm = ({ setUser, onError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [setUser])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({
        username,
        password,
      })

      window.localStorage.setItem('user', JSON.stringify(user))

      setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      onError('wrong username or password')
      setTimeout(() => {
        onError(null)
      }, 5000)
    }
  }

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
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
