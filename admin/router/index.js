const express = require('express')
const User = require('../../dbModel/user')
const Class = require('../../dbModel/class')
const Blog = require('../../dbModel/blog')
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
  },
  timeParser: function (obj) {
    var date = new Date(obj)
    var y = 1900 + date.getYear()
    var m = '0' + (date.getMonth() + 1)
    var d = '0' + date.getDate()
    var h = '0' + date.getHours()
    var min = '0' + date.getMinutes()
    return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length) + ' ' + h.substring(h.length - 2, h.length) + ':' + min.substring(min.length - 2, min.length)
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
    console.log('正确的页码是' + Dpage + '最大页码是' + Math.ceil(length / pageMaxNum))
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
  Class.find().then((data) => {
    return res.render('class', {
      classList: data
    })
  })
})
router.get('/list', function (req, res, next) {
  Blog.find({}, '_id blogTitle blogAhtuor blogCate blogDesc blogAhtuor blogDate').then((data) => {
    data.forEach((u) => {
      u.id = JSON.parse(JSON.stringify(u._id))
      u.blogDate = tools.timeParser(Number(u.blogDate))
      u.blogDesc = u.blogDesc.substring(0, 20) + '...'
    })
    return res.render('articleList', {
      data
    })
  })
})
router.get('/addClass', function (req, res, next) {
  Class.find().then((data) => {
    console.log(data)
    return res.render('class_add', {
      classList: data
    })
  })
})
router.get('/todo', function (req, res, next) {
  Class.find().then((data) => {
    return res.render('todo', {
      classList: data
    })
  })
})
router.get('/todoList', function (req, res, next) {
  Class.find().then((data) => {
    return res.render('todoList', {
      classList: data
    })
  })
})
router.get('/todo2', function (req, res, next) {
  Blog.find({}, '_id blogTitle blogAhtuor blogCate').then((data) => {
    data.forEach((u) => {
      u.id = JSON.parse(JSON.stringify(u._id))
    })
    return res.render('todoList2', {
      data
    })
  })
})
router.get('/aBlog', function (req, res, next) {
  Class.find({}, 'className _id').then((pram) => {
    console.log(pram)
    pram.forEach((u) => {
      u.id = JSON.parse(JSON.stringify(u._id))
    })
    return res.render('addBlog', {
      classList: pram
    })
  })
})
router.get('/delBlogList', (req, res, next) => {
  Blog.find({}, '_id blogTitle blogAhtuor blogCate').then((data) => {
    data.forEach((u) => {
      u.id = JSON.parse(JSON.stringify(u._id))
    })
    return res.render('delBlogList', {
      data
    })
  })
})
router.get('/changeBlog', (req, res, next) => {
  const id = req.query.blogId
  Blog.findOne({_id: id}).then((data) => {
    console.log(data)
    data.id = id
    return res.render('blogChange', {
      blogData: data
    })
  })
})
module.exports = router
