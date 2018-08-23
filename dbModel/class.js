const mongoose = require('mongoose')
const classSchema = mongoose.Schema({
  // 类名
  className: String,
  // 创建者
  classAuthor: String,
  // 创建日期
  classDate: Date,
  // 类的简介
  classDescription: String,
  isShow: String
})
let classData = mongoose.model('classTable', classSchema)
module.exports = classData
