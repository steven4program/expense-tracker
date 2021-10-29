const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Record = require('../Record')
const Category = require('../Category')
const User = require('../User')
const { recordSeeds, userSeeds } = require('./seed.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  console.log('mongodb connected!')
  const { name, email, password } = userSeeds[0]
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash
      })
    )
    .then((user) => {
      Category.find()
        .lean()
        .then((categories) => {
          return Promise.all(
            Array.from(recordSeeds, (record, i) => {
              const category = categories.find(
                (category) => category.nameEn === record.category
              )
              record.categoryId = category._id
              record.userId = user._id
            })
          )
        })
        .then(() => Record.create(recordSeeds))
        .then(() => {
          console.log('recordSeeder done.')
          process.exit()
        })
    })
    .catch((err) => console.log(err))
})
