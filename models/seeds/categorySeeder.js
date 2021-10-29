const db = require('../../config/mongoose')
const Category = require('../Category')
const { categorySeeds } = require('./seed.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  Category.create(categorySeeds)
    .then(() => {
      console.log('categorySeeder done.')
      process.exit()
    })
    .catch((error) => {
      console.log(error)
    })
})
