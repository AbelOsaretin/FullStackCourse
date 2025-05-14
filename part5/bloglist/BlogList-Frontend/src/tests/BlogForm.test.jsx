
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'
import { vi } from 'vitest'

test('calls createBlog with correct details when form is submitted', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const submitButton = screen.getByText('create')

  await user.type(titleInput, 'React Testing')
  await user.type(authorInput, 'Dan Abramov')
  await user.type(urlInput, 'https://react.dev/blog/testing')

  await user.click(submitButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'React Testing',
    author: 'Dan Abramov',
    url: 'https://react.dev/blog/testing'
  })
})
