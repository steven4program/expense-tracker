const Category = require('../Category')
const { categorySeeds } = require('./seed.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log(categorySeeds)
  Category.create(categorySeeds).then(() => {
    console.log('categorySeeder done.')
    return db.close()
  })
})
