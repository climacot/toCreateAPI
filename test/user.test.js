const bcrypt = require('bcrypt')
const User = require('../models/User.js')
const { api, getUsers } = require('./helpers.js')

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('Pass10#21.qwe', 10)
    const user = new User({
      username: 'userTest',
      name: 'user',
      passwordHash
    })
    await user.save()
  })

  test('works as expected creating a fresh username', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'test',
      name: 'develop',
      password: 'Pass10#21.qwe'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username is already token', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'userTest',
      name: 'develop2',
      password: 'Pass10#21.qwe'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.errors.username.message).toContain('`username` to be unique')
    const usersAtEnd = await getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
