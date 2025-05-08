const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

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


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
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

test('HTTP POST to /api/blogs creates a new blog post', async () => {
  // const initialBlogs = await Blog.find({})

  const newBlog = {
    title: 'Testing POST endpoint',
    author: 'Dev Abel',
    url: 'http://example.com/post-test',
    likes: 5,
  }

  const response = await api
    .post('/api/blogs')
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
    .send(blogWithoutUrl)
    .expect(400)
})


test('a blog can be deleted', async () => {
  const response = await Blog.find({})
  console.log(`${response[0]._id}`)
  await api
    .delete(`/api/blogs/${response[0]._id}`)
    .expect(204)

  // const blogsAfter = await Blog.find({})
  // assert.strictEqual(blogsAfter.length, response.length -1)
})

after(async () => {
  await mongoose.connection.close()
})