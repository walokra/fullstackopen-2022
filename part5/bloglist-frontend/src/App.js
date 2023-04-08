import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { create, getAll, update, remove } from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const [notificationType, setNotificationType] = useState('success')

  useEffect(() => {
    if (user) {
      getAll().then((blogs) => setBlogs(blogs))
    }
  }, [user])

  const showMessage = (message, type = 'success') => {
    setNotificationType(type)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const addedBlog = await create(blogObject)
      showMessage(
        `a new blog '${addedBlog.title}' by ${addedBlog.author} added`,
        'success'
      )
    } catch (error) {
      console.log(error)
      showMessage(
        `an error happened: ${JSON.stringify(error.response.statusText)}`,
        'error'
      )
    }

    const blogs = await getAll()
    setBlogs(blogs)
  }

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await update(blogObject.id, blogObject)
      showMessage(
        `blog '${updatedBlog.title}' by ${updatedBlog.author} updated`,
        'success'
      )
    } catch (error) {
      console.log(error)
      showMessage(
        `an error happened: ${JSON.stringify(error.response.statusText)}`,
        'error'
      )
    }

    const blogs = await getAll()
    setBlogs(blogs)
  }

  const removeBlog = async (blogObject) => {
    try {
      if (
        window.confirm(
          `Remove blog ${blogObject.title} by ${blogObject.author}?`
        )
      ) {
        await remove(blogObject.id)
        showMessage('blog removed', 'success')
      }
    } catch (error) {
      console.log(error)
      showMessage(
        `an error happened: ${JSON.stringify(error.response.statusText)}`,
        'error'
      )
    }

    const blogs = await getAll()
    setBlogs(blogs)
  }

  const handleError = (message, type = 'error') => {
    setNotificationType(type)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const logout = (event) => {
    event.preventDefault()
    setUser(null)
    setBlogs([])
    window.localStorage.clear()
  }

  const logoutForm = () => (
    <form onSubmit={logout}>
      <button type="submit">logout</button>
    </form>
  )

  const addBlogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

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

      {user && blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          username={user.username}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  )
}

export default App
