const mongoose = require('mongoose')
const Category = require('../Category')
mongoose.connect('mongodb://localhost/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

const categoryData = [
  ['家居物業', 'fa-home'],
  ['交通出行', 'fa-shuttle-van'],
  ['休閒娛樂', 'fa-grin-beam'],
  ['餐飲食品', 'fa-utensils'],
  ['其他', 'fa-pen']
].map((category) => ({
  title: category[0],
  icon: category[1]
}))

db.once('open', () => {
  Category.create(categoryData).then(() => {
    console.log('categorySeeder done.')
    return db.close()
  })
})

db.on('error', () => {
  console.log('mongodb error!')
})
