// @ts-check

/* eslint-disable no-console */

const express = require('express')
const fs = require('fs')

const app = express()

const PORT = 5000

app.use('/', async (req, res, next) => {
  console.log('Middelware 1')

  const fileContent = await fs.promises.readFile('.gitignore')

  const requestedAt = new Date()
  // @ts-ignore
  req.requestedAt = requestedAt
  // @ts-ignore
  req.fileContent = fileContent
  next()
})

/* 수많은 middleware들 있다고 가정 */

app.use((req, res) => {
  console.log('Middelware 2')
  // @ts-ignore
  res.send(`Requested at ${req.requestedAt}, ${req.fileContent}`)
})

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
