const express = require('express')
console.log('adminRouter is Ready')
const router = express.Router()
router.get('/', function (req, res, next) {
  res.render('index')
})
router.get('/user', function (req, res, next) {
  res.render('user')
})
module.exports = router
