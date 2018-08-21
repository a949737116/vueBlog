const express = require('express')
const User = require('../../dbModel/user')
console.log('adminRouter is Ready')
const router = express.Router()
const pageMaxNum = 20
const tools = {
  getUrl: function (req) {
    const data = req.query
    return data
  },
  getUrlPage: function (req) {
    const data = req.query.page || 1
    return data
  },
  dealWithPage: function (page, num) {
    const dataNum = page * pageMaxNum
    if (page <= 0) {
      return 1
    } else if (dataNum > num) {
      const page2 = Math.ceil(num / pageMaxNum)
      return page2
    } else {
      return page
    }
  }
}
router.get('/', function (req, res, next) {
  res.render('index')
})
router.get('/user', function (req, res, next) {
  let page = tools.getUrlPage(req)
  page = Number(page)
  User.count().then((length) => {
    // data是对象数组
    console.log('一共有' + length + '条数据')
    const Dpage = tools.dealWithPage(page, length)
    console.log('正确的页码是' + Dpage + '最大页码是' + length)
    return User.find().limit(pageMaxNum).skip((Dpage - 1) * pageMaxNum).then((data) => {
      if (data) {
        data.forEach((item) => {
          item.ifSex = item.sex === 'm' ? '男' : '女'
          item.ifAdmin = item.isAdmin ? '是' : '否'
          switch (item.job) {
            case '00':
              item.job1 = '学生'
              break
            case '01':
              item.job1 = '从业人员'
              break
            case '02':
              item.job1 = '兴趣人群'
              break
            case '03':
              item.job1 = '其他'
              break
          }
        })
      }
      // 页码处理
      const pageData = {
        Dpage: Dpage,
        Tpage: Math.ceil(length / pageMaxNum)
      }
      res.render('user', {
        userData: data,
        pageData
      })
      return true
    })
  })
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
