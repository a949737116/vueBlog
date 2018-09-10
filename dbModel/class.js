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
  // 是否展示
  isShow: String,
  // 类的id
  classId: String
})
let classData = mongoose.model('classTable', classSchema)
module.exports = classData
