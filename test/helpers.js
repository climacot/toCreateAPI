const supertest = require('supertest')
const User = require('../models/User.js')
const { app } = require('../index.js')

const api = supertest(app)

const initialNotes = [
  {
    content: 'nota de prueba 1',
    important: true,
    date: new Date()
  },
  {
    content: 'nota de prueba 2',
    important: true,
    date: new Date()
  }
]

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

module.exports = {
  api,
  initialNotes,
  getAllContentFromNotes,
  getUsers
}
