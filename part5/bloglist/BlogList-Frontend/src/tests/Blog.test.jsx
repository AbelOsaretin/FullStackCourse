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
import Blog from '../components/Blog'

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
