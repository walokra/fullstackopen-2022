import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Togglable />', () => {
  let container
  let updateBlog = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Jest',
      url: 'https://testing-library.com/docs/react-testing-library/intro',
      likes: 1,
    }

    container= render(<Blog
      blog={blog}
      updateBlog={updateBlog}
      username={null}
      removeBlog={jest.fn()} />).container
  })

  test('renders content', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(div).toHaveTextContent(
      'Jest'
    )
  })

  test('url and likes is not rendered by default', () => {
    expect(screen.queryByText(
      'https://testing-library.com/docs/react-testing-library/intro'
    )).toBeNull()

    expect(screen.queryByText(
      'likes:'
    )).toBeNull()
  })

  test('after clicking the button, url, likes and user are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
      'https://testing-library.com/docs/react-testing-library/intro'
    )

    expect(div).toHaveTextContent(
      'likes:'
    )

    expect(div).toHaveTextContent(
      'unknown user'
    )
  })

  test('likes button calls updateBlog', async () => {
    const user = userEvent.setup()

    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })

})
