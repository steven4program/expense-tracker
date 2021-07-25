// apply Express and Express Router
const express = require('express')
const router = express.Router()

// apply modules
const Record = require('../../models/Record')
const Category = require('../../models/Category')

const categories = []
Category.find()
  .lean()
  .then((category) => categories.push(...category))
  .catch((error) => console.error(error))

// define home route
router.get('/', (req, res) => {
  const category = req.query.category
  const filter = {}
  if (category) {
    filter.category = category
  }

  Record.find(filter)
    .populate('category')
    .lean()
    .sort({ date: 'desc' }) // desc in date
    .then((records) => {
      let totalAmount = 0
      records.forEach((record) => (totalAmount += record.amount))
      res.render('index', { categories, category, records, totalAmount })
    })
    .catch((error) => console.error(error))
})

// exports router
module.exports = router
