// apply Express and Express Router
const express = require('express')
const router = express.Router()

// login route
router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router
