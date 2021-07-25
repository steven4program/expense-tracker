// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Record = require('./models/Record')
const Category = require('./models/Category')
const helpers = require('./tools/handlebarsHelpers')

const routes = require('./routes')

const app = express()
const port = 3000

const categories = []
Category.find()
  .lean()
  .then((category) => categories.push(...category))
  .catch((error) => console.error(error))

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers }))
app.set('view engine', 'hbs')

mongoose.connect('mongodb://localhost/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
