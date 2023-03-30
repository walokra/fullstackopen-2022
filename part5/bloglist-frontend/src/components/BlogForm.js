import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [state, setState] = useState({
    title: '',
    author: '',
    url: '',
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(state)

    setState({
      title: '',
      author: '',
      url: '',
    })
  }

  const handleChange = (evt) => {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }

  return (
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
  )
}

export default BlogForm
