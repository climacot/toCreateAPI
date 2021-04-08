require('dotenv').config()
require('./mongo.js')

const express = require('express')
const app = express()

const cors = require('cors')

const handleErrors = require('./middleware/handleErrors.js')
const notFound = require('./middleware/notFound.js')

const userRouter = require('./controllers/users.js')
const noteRouter = require('./controllers/notes.js')
const loginRouter = require('./controllers/login.js')

app.use(cors())
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/notes', noteRouter)
app.use('/api/login', loginRouter)

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
module.exports = { app, server }
