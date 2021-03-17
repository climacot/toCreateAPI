const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())
app.use(logger)

let notes = [
  {
    id: 1,
    content: 'keqrqwk',
    date: '2terter131',
    important: true
  },
  {
    id: 2,
    content: 'kweqk',
    date: '21ewqe2131',
    important: true
  },
  {
    id: 3,
    content: 'k4444k',
    date: '213rqwe31',
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>hello world putos gonorreas ome gonorrea xdxdxdx :v</h1>')
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  // eslint-disable-next-line no-return-assign
  notes = notes.filter(note => note.id = !id)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missig'
    })
  }
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  notes = notes.concat(newNote)
  response.status(201).json(newNote)
})

app.use((request, responde) => {
  response.status(404).json({
    error: 'Not Found'
  })
})
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
