const Record = require('../Record')
const Category = require('../Category')
const { recordSeeds } = require('./seed.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log(recordSeeds)
  Record.create(recordSeeds).then(() => {
    console.log('recordSeeder done.')
    return db.close()
  })
})
