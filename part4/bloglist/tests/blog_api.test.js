const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')


const api = supertest(app)


const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'James',
    url: 'link',
    likes: 1
  },
  {
    title: 'Backend is hard',
    author: 'Abel',
    url: 'link',
    likes: 133
  },
]

let token
beforeEach(async () => {
  // await Blog.deleteMany({})
  // let blogObject = new Blog(initialBlogs[0])
  // await blogObject.save()
  // blogObject = new Blog(initialBlogs[1])
  // await blogObject.save()

  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'testuser', name: 'Test User', passwordHash })
  const savedUser = await user.save()

  
  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'sekret' })

  token = loginResponse.body.token

  
  for (let blog of initialBlogs) {
    const newBlog = new Blog({ ...blog, user: savedUser._id })
    await newBlog.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

   
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blog posts have "id" as the identifier property', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {

    assert.strictEqual(blog._id, undefined)
  })
})

// test('HTTP POST to /api/blogs creates a new blog post', async () => {
//   // const initialBlogs = await Blog.find({})

//   const newBlog = {
//     title: 'Testing POST endpoint',
//     author: 'Dev Abel',
//     url: 'http://example.com/post-test',
//     likes: 5,
//   }

//   const response = await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const blogsAfter = await Blog.find({})
//   assert.strictEqual(blogsAfter.length, initialBlogs.length + 1)

//   const titles = blogsAfter.map(blog => blog.title)
//   assert.ok(titles.includes(newBlog.title))

// })

test('HTTP POST to /api/blogs creates a new blog post', async () => {
  const newBlog = {
    title: 'Testing POST endpoint',
    author: 'Dev Abel',
    url: 'http://example.com/post-test',
    likes: 5,
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await Blog.find({})
  assert.strictEqual(blogsAfter.length, initialBlogs.length + 1)

  const titles = blogsAfter.map(blog => blog.title)
  assert.ok(titles.includes(newBlog.title))
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'No Likes Blog',
    author: 'Anonymous',
    url: 'http://nolikes.com'
  }

  const response = await api
  .post('/api/blogs')
  .set('Authorization', `Bearer ${token}`)
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const savedBlog = response.body
  assert.strictEqual(savedBlog.likes, 0)
})

test('missing title results in 400 Bad Request', async () => {
  const blogWithoutTitle = {
    author: 'Unknown',
    url: 'http://example.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogWithoutTitle)
    .expect(400)
})

test('missing url results in 400 Bad Request', async () => {
  const blogWithoutUrl = {
    title: 'Missing URL',
    author: 'Unknown',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogWithoutUrl)
    .expect(400)
})


// test('a blog can be deleted', async () => {
//   const response = await Blog.find({})
//   console.log(`${response[0]._id}`)
//   await api
//     .delete(`/api/blogs/${response[0]._id}`)
//     .expect(204)

//   const blogsAfter = await Blog.find({})
//   assert.strictEqual(blogsAfter.length, response.length -1)
// })

test('a blog can be deleted', async () => {
  const newBlog = {
    title: 'To be deleted',
    author: 'Author',
    url: 'http://delete.me',
    likes: 1,
  }

  const postResponse = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)

  const blogId = postResponse.body.id

  await api
    .delete(`/api/blogs/${blogId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAfter = await Blog.find({})
  assert.strictEqual(blogsAfter.length, initialBlogs.length)
})

test('likes of a blog can be updated', async () => {
  const updatedLikes = { likes: 10 }
  const blogToUpdate = await Blog.find({})

  const response = await api
    .put(`/api/blogs/${blogToUpdate[0]._id}`)
    .send(updatedLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 10)

  const blogInDb = await Blog.findById(blogToUpdate[0]._id)
  assert.strictEqual(blogInDb.likes, 10)
})

describe('Adding a blog without a token', () => {
  test('fails to add blog without token', async () => {
    const newBlog = {
      title: 'Unauthorized Blog',
      author: 'Anonymous',
      url: 'http://noauth.com',
      likes: 10
    }
  
    const response = await api.post('/api/blogs').send(newBlog)
  
    assert.strictEqual(response.status, 401)
    // assert.match(response.body.error, "token invalid")
  })
})



after(async () => {
  await mongoose.connection.close()
})