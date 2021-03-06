/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */

const supertest = require('supertest')
const app = require('./app')

const request = supertest(app)

test('retrieve user json', async () => {
  const result = await request.get('/users/15').accept('application/json')
  console.log(result.body)

  // result.body가 nickname = string 이여야 한다.
  expect(result.body).toMatchObject({
    nickname: expect.any(String),
  })
})

test('retrieve user page', async () => {
  const result = await request.get('/users/15').accept('text/html')

  expect(result.text).toMatch(/^<html>.*<\/html>$/)

  console.log(result.text)
})

test('update nickname', async () => {
  const newNickname = 'newNickname'

  const res = await request
    .post('/users/15/nickname')
    .send({ nickname: newNickname })
  expect(res.status).toBe(200)

  const userResult = await request.get('/users/15').accept('application/json')
  expect(userResult.status).toBe(200)
  expect(userResult.body).toMatchObject({
    nickname: newNickname,
  })
})
