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

after(async () => {
  await mongoose.connection.close()
})