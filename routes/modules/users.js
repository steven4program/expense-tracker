// apply Express and Express Router
const express = require('express')
const router = express.Router()

// login route
router.get('/login', (req, res) => {
  res.render('login')
})

// router.post('login', (req, res) => {

// })

router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router
