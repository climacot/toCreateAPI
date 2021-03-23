const mongoose = require('mongoose')
const { server } = require('../index.js')
const Note = require('../models/Note.js')
const { api, initialNotes, getAllContentFromNotes } = require('./helpers.js')

beforeEach(async () => {
  await Note.deleteMany({})
  const note1 = new Note(initialNotes[0])
  await note1.save()
  const note2 = new Note(initialNotes[1])
  await note2.save()
})

test('notes are returned as jason', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about note 1', async () => {
  const {
    contents
  } = await getAllContentFromNotes()
  expect(contents).toContain('nota de prueba 1')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'nota valida',
    important: true
  }
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const { contents, response } = await getAllContentFromNotes()
  expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(contents).toContain(newNote.content)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
