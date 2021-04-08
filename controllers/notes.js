const notesRouter = require('express').Router()
const User = require('../models/User.js')
const Note = require('../models/Note.js')
const useExtractor = require('../middleware/userExtractor.js')

notesRouter.get('/', (request, response, next) => {
  Note.find({}).populate('user', { username: 1, name: 1 })
    .then(note => {
      response.json(note)
    })
})

notesRouter.get('/:id', useExtractor, (request, response, next) => {
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

notesRouter.put('/:id', useExtractor, (request, response, next) => {
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

notesRouter.delete('/:id', useExtractor, (request, response, next) => {
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

notesRouter.post('/', useExtractor, async (request, response, next) => {
  const {
    content,
    important = false
  } = request.body

  const { userId } = request
  const user = await User.findById(userId)

  if (!content) {
    return response.status(400).json({
      error: 'required "content" field is missing'
    })
  }

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user._id
  })

  try {
    const savedNote = await newNote.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.json(savedNote)
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
