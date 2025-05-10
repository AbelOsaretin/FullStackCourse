const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')



// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
      response.json(blogs)
    
  })

  blogsRouter.get('/:id', async (request, response, next) => {
    await Blog.findById(request.params.id)
      .then((blog) => {
        if (blog) {
          response.json(blog)
        } else {
          response.status(404).end()
        }
      })
  
      .catch((error) => next(error))
  })

// blogsRouter.post('/', (request, response, next) => {
//     const body = request.body
  
//     const blog = new Blog({
//         title: body.title,
//         author: body.author,
//         url: body.url,
//         likes: body.likes,
//     })
  
//     blog.save()
//       .then(savedBlog => {
//         response.json(savedBlog)
//       })
//       .catch(error => next(error))
//   })

blogsRouter.post('/', middleware.userExtractor , async (request, response, next) => {
  const body = request.body
  const user = request.user
  

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  // const user = await User.findById(decodedToken.id)
console.log(user)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)

})


// blogsRouter.delete('/:id',middleware.tokenExtractor, async (request, response, next) => {
//   const id = request.params.id
//   const blog = await Blog.findById(id)
//   const userid = jwt.verify(request.token, process.env.SECRET)
//   if (!userid.id) {
//     return response.status(401).json({ error: 'token invalid' })
//   }
//   if ( blog.user.toString() !== userid.toString() ){ 
//     return response.status(401).json({ error: 'not blog author' })
// }

// try {
    
//   await Blog.findByIdAndDelete(id)
//   response.status(204).end()
// } catch (error) {
//   next(error)
// }
// })

blogsRouter.delete('/:id', middleware.tokenExtractor, async (request, response, next) => {
  try {

    const user = request.user
    const id = request.params.id
    const blog = await Blog.findById(request.params.id)

    console.log("id", request.params.id)
    console.log(blog)

    if(!blog) {
      return response.status(404).json({ error: 'cannot find blog' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    

    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(401).json({ error: 'not blog author' })
    }

    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', (request, response, next) => {
  // const { content, important } = request.body

  Blog.findById(request.params.id)
    .then(blog => {
      if (!blog) {
        return response.status(404).end()
      }

      blog.likes = request.body.likes

      return blog.save().then((updatedBlog) => {
        response.json(updatedBlog)
      })
    })
    .catch(error => next(error))
})


  module.exports = blogsRouter