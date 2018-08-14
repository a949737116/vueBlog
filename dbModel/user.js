const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  account: String,
  password: String,
  name: String,
  rPassword: String,
  sex: String,
  job: String
})
let userData = mongoose.model('userTable', userSchema)
module.exports = userData
