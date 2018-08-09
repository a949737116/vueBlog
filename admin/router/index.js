const express = require('express')
console.log('adminRouter is Ready')
const router = express.Router()
router.get('/', function (req, res, next) {
  res.render('index')
})
router.get('/user', function (req, res, next) {
  res.render('user')
})
router.get('/class', function (req, res, next) {
  res.render('class')
})
router.get('/list', function (req, res, next) {
  res.render('articleList')
})
router.get('/addClass', function (req, res, next) {
  res.render('class_add')
})
router.get('/todo', function (req, res, next) {
  res.render('todoList')
})
router.get('/todo2', function (req, res, next) {
  res.render('todoList2')
})
router.get('/tip', function (req, res, next) {
  res.render('tips')
})
router.get('/mc', function (req, res, next) {
  res.render('modifyClass')
})
router.get('/aBlog', function (req, res, next) {
  res.render('addBlog')
})
module.exports = router
