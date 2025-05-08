const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
      response.json(blogs)
    })
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

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  blog.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})


blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
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