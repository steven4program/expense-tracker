// apply Express and Express Router
const express = require('express')
const router = express.Router()

// apply modules
const Record = require('../../models/Record')
const Category = require('../../models/Category')

// define home route
router.get('/', (req, res) => {
  const categories = []
  let totalAmount = 0
  Promise.all([
    Record.find().lean().sort({ date: 'desc' }),
    Category.find().lean()
  ])
    .then((results) => {
      const records = results[0]
      const categories = results[1]
      records.forEach((record) => {
        const category = categories.find(
          (category) => category.nameEn === record.category
        )
        record.category = category.icon
        totalAmount += record.amount
      })
      res.render('index', { categories, records, totalAmount })
    })
    .catch((error) => console.log(error))
})

module.exports = router
