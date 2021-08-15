const Record = require('../Record')
const Category = require('../Category')

let recordData = [
  ['雜貨採買', '2021/07/25', '家居物業', 553, '家樂福'],
  ['機車加油', '2021/07/25', '交通出行', 125, '中油'],
  ['Netflix月費', '2021/07/24', '休閒娛樂', 390, 'Netflix'],
  ['保險費', '2021/07/23', '其他', 25830, '國泰人壽'],
  ['早餐', '2021/07/23', '餐飲食品', 79, 'Q Burger']
]

const db = require('../../config/mongoose')

db.once('open', () => {
  const categoryList = {}

  Category.find()
    .lean()
    .then((categories) => {
      categories.forEach((category) => {
        categoryList[category.name] = category._id
      })
      return recordData.map((record) => ({
        name: record[0],
        date: record[1],
        category: categoryList[record[2]],
        amount: record[3],
        merchant: record[4]
      }))
    })
    .then((recordData) => {
      Record.create(recordData).then(() => {
        console.log('recordSeeder done.')
        return db.close()
      })
    })
    .catch((error) => console.error(error))
})
