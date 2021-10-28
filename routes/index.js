// apply Express and Express Router
const express = require('express')
const router = express.Router()

// apply modules
const home = require('./modules/home')
const records = require('./modules/records')
const filter = require('./modules/filter')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

// direct request corresponding module
router.use('/records', authenticator, records)
router.use('/filter', filter)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router
