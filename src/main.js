// @ts-check

/* eslint-disable no-console */

const express = require('express')
const bodyParser = require('body-parser')

const userRouter = express.Router()

const app = express()
app.use(bodyParser.json())

const PORT = 5000

userRouter.get('/', (req, res) => {
  res.send('User list')
})

const USERS = {
  15: {
    nickname: 'foo',
  },
}

userRouter.param('id', (req, res, next, value) => {
  console.log('id Parameter', value)
  // @ts-ignore
  req.user = USERS[value]
  next()
})

userRouter.get('/:id', (req, res) => {
  console.log('userRouter get ID')
  // @ts-ignore
  res.send(req.user)
})

userRouter.post('/', (req, res) => {
  // Register user
  res.send('User registered')
})

userRouter.post('/:id/nickname', (req, res) => {
  // req.body: {"nickname": bar}
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`User nickname update: ${nickname}`)
})

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
