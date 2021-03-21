const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index.js')
const Note = require('../models/Note.js')
const api = supertest(app)
const initialNotes = [
  {
    content: 'sss',
    important: true,
    date: new Date()
  },
  {
    content: 'skkk',
    important: true,
    date: new Date()
  }
]

beforeEach(async () => {
  await Note.deleteMany({})
})

test('notes are returned as jason', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(2)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
