require('dotenv').config()
require('./mongo.js')

const express = require('express')
const app = express()
const cors = require('cors')
// const logger = require('./loggerMiddleware')
const Note = require('./models/Note')
const handleErrors = require('./middleware/handleErrors.js')
const notFound = require('./middleware/notFound.js')

app.use(cors())
app.use(express.json())
// app.use(logger)

app.get('/', (request, response, next) => {
  response.send('<h1>hello world</h1>')
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findById(id)
    .then(note => {
      note
        ? response.json(note)
        : response.status(404).end()
    })
    .catch(error => {
      next(error)
    })
})

app.get('/api/notes', (request, response, next) => {
  Note.find({})
    .then(notes => {
      response.json(notes)
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body
  const newNoteInfo = {
    content: note.content,
    important: note.important
  }
  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      response.json(result)
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => {
      next(error)
    })
  response.status(204).end()
})

app.post('/api/notes', (request, response, next) => {
  const note = request.body
  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missig'
    })
  }
  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important:
      typeof note.important !== 'undefined'
        ? note.important
        : false
  })
  newNote.save()
    .then(savedNote => {
      response.status(201).json(savedNote)
    })
    .catch(error => {
      next(error)
    })
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
