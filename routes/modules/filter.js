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
const allMonths = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12'
]

// define filter route
router.get('/', (req, res) => {
  let categoryFilter = req.query.category
  let monthFilter = req.query.month
  // let categoryFilter be all categories if choose 全部類別
  categoryFilter === 'all'
    ? (categoryFilter = allCategories)
    : (categoryFilter = req.query.category)

  monthFilter === 'all'
    ? (monthFilter = allMonths)
    : (monthFilter = req.query.month)
  const categories = []
  let totalAmount = 0

  Promise.all([
    Record.find({ category: categoryFilter }).lean().sort({ date: 'desc' }),
    Category.find().lean()
  ])
    .then((results) => {
      console.log(req.body)
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

module.exports = router
