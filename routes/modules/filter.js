// apply Express and Express Router
const express = require('express')
const router = express.Router()

// apply modules
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const allCategories = [
  'housewares',
  'transportation',
  'entertainment',
  'food',
  'others'
]

// define filter route
router.get('/', (req, res) => {
  let categoryFilter = req.query.category
  // let categoryFilter be all categories if choose 全部類別
  categoryFilter === 'all'
    ? (categoryFilter = allCategories)
    : (categoryFilter = req.query.category)
  const categories = []
  let totalAmount = 0

  Promise.all([
    Record.find({ category: categoryFilter }).lean().sort({ date: 'desc' }),
    Category.find().lean()
  ])
    .then((results) => {
      let filteredRecords = results[0]
      const categories = results[1]
      filteredRecords.forEach((record) => {
        const category = categories.find(
          (category) => category.nameEn === record.category
        )
        record.category = category.icon
        totalAmount += record.amount
      })
      res.render('index', {
        records: filteredRecords,
        categories,
        categoryFilter,
        totalAmount
      })
    })
    .catch((err) => console.log(err))
})
// exports router
module.exports = router
