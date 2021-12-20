// @ts-check

const express = require('express')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

const USERS = {
  15: {
    nickname: 'foo',
    profileImageKey: undefined,
  },
  16: {
    nickname: 'bar',
    profileImageKey: undefined,
  },
}

router.get('/', (req, res) => {
  res.send('User list')
})

// 없는 유저일 경우가 있을 수 있으므로 Error Handling 필요
router.param('id', async (req, res, next, value) => {
  try {
    // @ts-ignore
    const user = USERS[value]

    if (!user) {
      const err = new Error('User not found.')
      err.statusCode = 404
      throw err
    }
    // @ts-ignore
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType === 'json') {
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      // @ts-ignore
      nickname: req.user.nickname,
      userId: req.params.id,
      // profileImageURL: '/uploads/edf3507f04ecbcc17627bc9308e6009f',
      profileImageURL: `/uploads/${req.user.profileImageKey}`,
    })
  }
})

router.post('/', (req, res) => {
  // Register user
  res.send('User registered')
})

router.post('/:id/nickname', (req, res) => {
  // req.body: {"nickname": bar}
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`User nickname update: ${nickname}`)
})

router.post('/:id/profile', upload.single('profile'), (req, res, next) => {
  const { user } = req
  const { filename } = req.file
  user.profileImageKey = filename

  res.send(`User profile image uploaded: ${filename}`)
})

module.exports = router
