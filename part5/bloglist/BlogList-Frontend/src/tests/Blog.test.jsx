// import { render, screen } from '@testing-library/react'
// import Blog from '../components/Blog'

// test('renders blog content', () => {
//   const blog = {
//     title: 'Component testing is done with react-testing-library',
//     author: 'abel'
//   }

//   render(<Blog blog={blog} />)

//   const element = screen.getByText('Component testing is done with react-testing-library','abel')
//   expect(element).toBeDefined()
// })


import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import axios from 'axios'

vi.mock('axios')


test('renders title and author, but not url or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'abel',
    url: 'http://example.com',
    likes: 5,
    user: { name: ' Dev A' }
  }

  const user = { name: 'Dev A' }

  const { container } = render(<Blog blog={blog} user={user} />)

 
  const blogDiv = container.querySelector('.blog')
  expect(blogDiv).toHaveTextContent(
    'Component testing is done with react-testing-library abel'
  )

  
  const url = container.querySelector('.blog-title-author')
  expect(url).not.toHaveTextContent('http://example.com')

  const likes = container.querySelector('.blog-title-author')
  expect(likes).not.toHaveTextContent('likes 5')
})

test('clicking the view button displays blog URL and number of likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'abel',
    url: 'http://example.com',
    likes: 5,
    user: { name: 'Dev A' }
  }

  const user = { name: 'Dev A' }

  render(<Blog blog={blog} user={user} />)

  const userSim = userEvent.setup()
  const viewButton = screen.getByText('view')
  await userSim.click(viewButton)

  expect(screen.getByText('http://example.com')).toBeInTheDocument()
  expect(screen.getByText(/likes 5/)).toBeInTheDocument()
})

// test('clicking the like button twice calls event handler twice', async () => {
//   const blog = {
//     title: 'Component testing is done with react-testing-library',
//     author: 'abel',
//     url: 'http://example.com',
//     likes: 5,
//     user: { name: 'Dev A' },
//     id: '123'
//   }

//   const user = { name: 'Dev A' }

//   const mockLikeHandler = vi.fn()

//   // Wrap Blog so it accepts a prop for the like handler
//   render(
//     <Blog blog={blog} user={user} handleLike={mockLikeHandler} />
//   )

//   const userSim = userEvent.setup()

//   // Reveal the like button
//   const viewButton = screen.getByText('view')
//   await userSim.click(viewButton)

//   // Like button should now be visible
//   const likeButton = screen.getByText('like')
//   await userSim.click(likeButton)
//   await userSim.click(likeButton)

//   expect(mockLikeHandler).toHaveBeenCalledTimes(2)
// })

test('clicking the like button twice calls event handler twice', async () => {
  // Mock the PUT request to prevent real network calls
  axios.put.mockResolvedValue({
    data: {
      likes: 6,
    }
  })

  const blog = {
    title: 'Testing Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5,
    user: { name: 'Dev A' },
  }

  const dbUser = { name: 'Dev A' }

  render(<Blog blog={blog} user={dbUser} />)

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  // You can also check axios.put was called twice
  expect(axios.put).toHaveBeenCalledTimes(2)
})

