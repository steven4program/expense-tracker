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

// add record
router.get('/new', (req, res) => {
  res.render('new', { categories })
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, date, amount, merchant } = req.body
  const selectedCategory = categories.find((item) => item.nameEn === category)
  const categoryId = selectedCategory._id

  if (!name || !category || !date || !amount || !merchant) {
    return res.redirect('/new')
  }
  return Record.create({
    name,
    merchant,
    category,
    date,
    amount,
    userId,
    categoryId
  })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

// edit record
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { categories, record }))
    .catch((error) => console.error(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, date, amount, merchant } = req.body
  const selectedCategory = categories.find((item) => item.nameEn === category)
  const categoryId = selectedCategory._id

  return Record.findOne({ _id, userId })
    .then((record) => {
      Object.assign(record, req.body)
      record.categoryId = categoryId
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

// delete record
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

module.exports = router
