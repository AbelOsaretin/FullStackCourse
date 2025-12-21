import { useState } from 'react'
import blogServices from '../services/blogs'


const Blog = ({ blog, user }) => {

  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeButton = (id, currentLikes) => {
    blogServices.update(id, { likes: currentLikes + 1 })
  }

  const handleRemoveButton = (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      blogServices.remove(id)
    }

  }

  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }
  return (
    <div style={blogStyle} className='blog'>

      <div style={hideWhenVisible}  className='blog-title-author'>
        {blog.title} {blog.author}<div>
          <br/>
          <button onClick={() => setVisibility(true)}>view</button></div>

      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setVisibility(false)}>hide</button>
        <p>{blog.url}</p>
        <p> likes {blog.likes} <button onClick={() => handleLikeButton(blog.id, blog.likes)}>like</button></p>
        <p>{blog.user.name}</p>
        {

          user.name === blog.user.name?
            <button onClick={() => handleRemoveButton(blog.id, blog.title, blog.author)}>remove</button>
            :
            <div></div>
        }

      </div>


    </div>
  )
}

export default Blog