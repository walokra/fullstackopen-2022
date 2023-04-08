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
          id="title"
          onChange={handleChange}
          placeholder='write blog title here'
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={state.author}
          name="author"
          id="author"
          onChange={handleChange}
          placeholder='write blog author here'
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={state.url}
          name="url"
          id="url"
          onChange={handleChange}
          placeholder='write blog url here'
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
