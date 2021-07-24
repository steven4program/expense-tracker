// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
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
  res.render('index')
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/record/edit', (req, res) => {
  res.render('edit')
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
