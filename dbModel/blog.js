const mongoose = require('mongoose')
const blogSchema = mongoose.Schema({
  // 文章作者
  blogAhtuor: String,
  // 作者ID
  blogAhtuorId: {
    type: String,
    ref: 'userTable'
  },
  // 文章标题
  blogTitle: String,
  // 文章分类
  blogCate: {
    type: String,
    ref: 'classTable'
  },
  // 引语
  blogDesc: String,
  // 插图
  illustration: String,
  // 正文
  text: String,
  // 创作时间
  blogDate: String,
  // 评论列表
  blogComments: Array,
  // 点赞列表
  starList: Array
})
const blogDb = mongoose.model('blogTable', blogSchema)
module.exports = blogDb
