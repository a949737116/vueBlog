const mongoose = require('mongoose')
const blogSchema = mongoose.Schema({
  // 文章标题
  blogTitle: String,
  // 文章分类
  blogCate: String,
  // 引语
  blogDesc: String,
  // 插图
  illustration: String,
  // 正文
  text: String
})
const blogDb = mongoose.model('blogTable', blogSchema)
module.exports = blogDb
