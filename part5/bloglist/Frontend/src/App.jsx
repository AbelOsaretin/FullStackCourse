import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser]= useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null);
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

    useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

    const handleLogin = async (event) => {
    event.preventDefault()

    try{
    const user = await loginService.login({
        username, password,
      })


          window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong username or password', exception)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () =>{
    setUser('')
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const handleAddNewBlog = (event) => {
    event.preventDefault();
    
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((newBlog) => {
      setBlogs(blogs.concat(newBlog));
      setNotificationMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    });

  }

  const createNewBlog = () => {
    return <Togglable buttonLabel='new note' ref={blogFormRef}>
      <form onSubmit={handleAddNewBlog}>
       <div>
          title
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
        />
        </div>
       <div>
          author
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
        />
        </div>
        <div>
          url
            <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
        />
        </div>
      <button type="submit">create</button>
    </form> 
    </Togglable>
  }


  const display = () =>{
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
         <Notification message={notificationMessage} design={'error'}/>
        <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form> 
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notificationMessage} design={'success'}/>
      <p>{user.name} logged-in <button onClick={handleLogOut}>logout</button> </p>
      {createNewBlog()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}



  return (
    <div>
      
      {
      
      display()

      }
    
    </div>
  )
}

export default App