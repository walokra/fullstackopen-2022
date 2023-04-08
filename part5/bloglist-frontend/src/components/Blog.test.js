import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jest',
    url: 'https://testing-library.com/docs/react-testing-library/intro',
    likes: 1,
  }

  const { container } = render(<Blog
    blog={blog}
    updateBlog={jest.fn()}
    username={null}
    removeBlog={jest.fn()} />)

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
