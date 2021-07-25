// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Record = require('./models/Record')
const Category = require('./models/Category')
const showDate = require('./tools/handlebarsHelpers')

const app = express()
const port = 3000

const categories = []
Category.find()
  .lean()
  .then((category) => categories.push(...category))
  .catch((error) => console.error(error))

app.engine(
  'hbs',
  exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: { showDate } })
)
app.set('view engine', 'hbs')

mongoose.connect('mongodb://localhost/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// routes setting
app.get('/', (req, res) => {
  const category = req.query.category
  const filter = {}
  if (category) {
    filter.category = category
  }

  Record.find(filter)
    .populate('category')
    .lean()
    .then((records) => {
      let totalAmount = 0
      records.forEach((record) => (totalAmount += record.amount))
      res.render('index', { categories, category, records, totalAmount })
    })
    .catch((error) => console.error(error))
})

// add record
app.get('/records/new', (req, res) => {
  res.render('new', { categories })
})

app.post('/records', (req, res) => {
  const { name, category, date, amount } = req.body
  if (!name || !category || !date || !amount) {
    return res.redirect('/records/new')
  }
  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

// edit record
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { categories, record }))
    .catch((error) => console.error(error))
})

app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => {
      Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

// delete record
app.post('/records/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
