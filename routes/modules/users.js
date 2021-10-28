// apply Express and Express Router
const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../../models/User')

// login route
router.get('/login', (req, res) => {
  res.render('login')
})
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

// register route
router.get('/register', (req, res) => {
  res.render('register')
})

// register user
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then((user) => {
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))
    }
  })
})

module.exports = router
