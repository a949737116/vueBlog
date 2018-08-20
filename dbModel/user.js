const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  // 账号
  account: String,
  // 密码
  password: String,
  // 昵称
  name: String,
  // 二次密码
  rPassword: String,
  // 性别
  sex: String,
  // 职业
  job: String,
  // 头像目录
  icon_image: String,
  // 会员等级
  level: Number,
  // 是否管理员权限
  isAdmin: Boolean,
  // 我的邮箱,
  email: String,
  // 联系电话
  tel: String,
  // 居住地址
  adress: String,
  // 所在城市
  city: String,
  // 文章数
  essayNum: Number
})
let userData = mongoose.model('userTable', userSchema)
module.exports = userData
