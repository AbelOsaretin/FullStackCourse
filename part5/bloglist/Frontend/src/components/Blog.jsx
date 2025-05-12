import { useState } from "react";

const Blog = ({ blog }) => {

  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleViewButton =() => (
    setVisibility(!visibility)
  )

  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }
  
  
  return (
  <div style={blogStyle}>
    <div>
    {blog.title} {blog.author}
      <div style={hideWhenVisible}>
          <button onClick={() => setVisibility(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p> likes {blog.likes} <button>like</button></p>
        <p>{blog.author}</p>
        <button onClick={() => setVisibility(false)}>hide</button>
      </div>
    </div>

  </div>  
  )
}

export default Blog