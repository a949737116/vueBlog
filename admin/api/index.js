const Users = require('../../dbModel/user')
const Class = require('../../dbModel/class')
const Blog = require('../../dbModel/blog')
const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const defualtExtraOption = {
  icon_image: '/data/question.png',
  hornor: ['new'],
  level: 0,
  isAdmin: false,
  email: '',
  tel: '',
  adress: '',
  city: '',
  essayNum: ''
}
const pageMaxNum = 10
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
  formParser: function (maxSize, url) {
    const form = new formidable.IncomingForm()
    form.uploadDir = url || path.resolve(__dirname, '../../upLoads')
    form.maxFileSize = maxSize || 1024 * 1024 * 5
    form.keepExtensions = true
    return form
  },
  timeParser: function (obj) {
    var date = new Date(obj)
    var y = 1900 + date.getYear()
    var m = '0' + (date.getMonth() + 1)
    var d = '0' + date.getDate()
    var h = '0' + date.getHours()
    var min = '0' + date.getMinutes()
    return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length) + ' ' + h.substring(h.length - 2, h.length) + ':' + min.substring(min.length - 2, min.length)
  },
  dateParser: function (date) {
    var y = 1900 + date.getYear()
    var m = '0' + (date.getMonth() + 1)
    var d = '0' + date.getDate()
    return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
  },
  buildFs: function (dispath) {
    if (!fs.existsSync(path.dirname(dispath))) {
      this.buildFs(path.dirname(dispath))
    }
    fs.mkdirSync(dispath)
  }
}
router.post('/goToReg', function (req, res, next) {
  const data = req.body
  if (!data.inspected) {
    res.json({
      status: -1,
      tip: '请不要非法注册'
    })
    return false
  } else {
    Users.findOne({
      account: data.account
    }).then(function (fData) {
      if (fData) {
        res.json({
          status: -1,
          tip: '该账号已经被注册'
        })
        return false
      } else {
        // 配置默认参数
        const mdata = Object.assign({}, defualtExtraOption, data)
        var userInfo = new Users(mdata)
        userInfo.save().then(function (feedBack) {
          res.json({
            status: 0,
            tip: '恭喜您，您已注册成功'
          })
          return true
        }).then(function (err) {
          console.log(err)
          res.json({
            status: -1,
            tip: '注册失败'
          })
          return false
        })
      }
    })
    /* 数据结构
    data = {
      account: '',
      name: '',
      password: '',
      rPassword: '',
      sex: 'm',
      job: '',
      inspected: bollean
    }
    */
  }
})
router.post('/goToLogin', function (req, res, next) {
  const data = req.body
  if (!data.inspected) {
    res.json({
      status: -1,
      tip: '请不要非法登录'
    })
    return false
  } else {
    Users.findOne({
      account: data.account
    }).then(function (fData) {
      if (!fData) {
        res.json({
          status: -1,
          tip: '该账号不存在，请检查您的账号信息'
        })
      } else {
        if (data.password !== fData.password || data.password !== fData.rPassword) {
          res.json({
            status: -1,
            tip: '登陆密码错误，请检查您的密保信息'
          })
        } else {
          res.cookie('logInfo', {
            account: data.account,
            isAdmin: fData.isAdmin,
            name: fData.name,
            userId: fData._id
          })
          res.json({
            status: 0,
            tip: '恭喜您登陆成功',
            info: fData
          })
        }
      }
    })
  }
})
router.get('/getProvince', function (req, res, next) {
  res.json({
    provinceList: [
      {
        value: 'hebei',
        label: '河北省'
      },
      {
        value: 'liaoning',
        label: '辽宁省'
      },
      {
        value: 'heilongjiang',
        label: '黑龙江省'
      },
      {
        value: 'zhejiang',
        label: '浙江省'
      },
      {
        value: 'fujian',
        label: '福建省'
      },
      {
        value: 'shandong',
        label: '山东省'
      },
      {
        value: 'guangdong',
        label: '广东省'
      },
      {
        value: 'hubei',
        label: '湖北省'
      },
      {
        value: 'sichuang',
        label: '四川省'
      },
      {
        value: 'yunnan',
        label: '云南省'
      },
      {
        value: 'gangsu',
        label: '甘肃省'
      },
      {
        value: 'taiwang',
        label: '台湾省'
      },
      {
        value: 'shanxi',
        label: '山西省'
      },
      {
        value: 'jilin',
        label: '吉林省'
      },
      {
        value: 'jiangsu',
        label: '江苏省'
      },
      {
        value: 'anhui',
        label: '安徽省'
      },
      {
        value: 'jiangxi',
        label: '江西省'
      },
      {
        value: 'henan',
        label: '河南省'
      },
      {
        value: 'hunan',
        label: '湖南省'
      },
      {
        value: 'hainan',
        label: '海南省'
      },
      {
        value: 'guizhou',
        label: '贵州省'
      },
      {
        value: 'xiaxi',
        label: '陕西省'
      },
      {
        value: 'qinghai',
        label: '青海省'
      },
      {
        value: 'zizhiqu',
        label: '中国自治区'
      }
    ]
  })
  next()
})
router.post('/supplement', function (req, res, next) {
  const data = req.body
  if (data.verifier) {
    Users.findOne({
      account: data.account
    }).then(function (result) {
      if (!result) {
        res.json({
          status: -1,
          tip: '您的操作不符合流程要求，请联系系统管理员'
        })
        return false
      } else {
        // req.body.info
        Users.update({account: data.account}, data.info).then(function (cb) {
          if (cb) {
            res.json({
              status: 0,
              tip: '您的资料已经修改成功'
            })
            return true
          } else {
            res.json({
              status: -1,
              tip: '资料修改出错'
            })
            return false
          }
        }).then(function (err) {
          if (err) {
            console.log(err)
          }
        })
      }
    }).then(function (err) {
      console.log(err)
    })
  } else {
    res.json({
      status: -1,
      tip: '请不要非法修改资料'
    })
    return false
  }
})
router.get('/getPersonalData', function (req, res, next) {
  const account = req.query.account
  Users.findOne({account: account}).then(function (data) {
    res.json(
      {
        info: data
      }
    )
    return true
  })
})
router.get('/deleteAccount', function (req, res, next) {
  Users.deleteOne({account: req.query.account}).then(function (data) {
    res.json({
      code: 0,
      message: '该用户已经被成功删除'
    })
    return true
  })
})
router.post('/changeLevel', function (req, res, next) {
  const data = req.body
  Users.findOne({
    account: data.account
  }).then((dd) => {
    if (dd) {
      return Users.update({account: data.account}, {level: data.level}).then(function () {
        res.json({
          code: 0,
          message: '该用户的等级已被成功更改'
        })
        return true
      })
    } else {
      return false
    }
  })
})
router.post('/adminChange', function (req, res, next) {
  const data = req.body
  Users.findOne({
    account: data.account
  }).then((dd) => {
    if (dd) {
      return Users.update({account: data.account}, {isAdmin: data.ifAdmin}).then(function () {
        res.json({
          code: 0,
          message: '该用户的管理权限已被成功更改'
        })
        return true
      })
    } else {
      return false
    }
  })
})
router.post('/addClass', (req, res, next) => {
  // 读取cookie
  const cookieInfo = req.cookies.logInfo
  if (cookieInfo.isAdmin) {
    const postData = req.body
    Class.findOne({className: postData.className}).then((answer) => {
      if (!answer) {
        const newClass = new Class({
          className: postData.className,
          classDescription: postData.classDesc,
          classDate: new Date(),
          classAuthor: cookieInfo.name,
          isShow: postData.isShow,
          classId: postData.className + new Date().valueOf()
        })
        return newClass.save().then(() => {
          res.json({
            code: 0,
            message: '恭喜您，新的分类已被成功创建'
          })
        })
      } else {
        return res.json({
          code: -1,
          message: '抱歉，该分类已存在'
        })
      }
    })
  } else {
    res.end()
    return false
  }
})
router.get('/deleteClass', (req, res, next) => {
  const query = req.query
  Class.findOne({className: query.className}).then((data) => {
    if (data) {
      return Class.deleteOne({className: query.className}).then(() => {
        res.json({
          code: 0,
          message: '恭喜您已经成功删除该分类'
        })
      })
    } else {
      return res.end()
    }
  })
})
router.post('/changeClass', (req, res, next) => {
  const body = req.body
  Class.findOne({className: body.oClassName}).then((data) => {
    if (data) {
      return Class.update({className: body.oClassName}, {
        className: body.className,
        classDescription: body.classDesc,
        isShow: body.isShow
      }).then(() => {
        res.json({
          code: 0,
          message: '恭喜您，分类信息更改成功'
        })
      })
    } else {
      return res.end()
    }
  })
})
router.post('/deleteClassList', function (req, res, next) {
  const list = req.body.classList
  if (list.length > 0) {
    return Class.remove({'className': {$in: list}}).then(() => {
      res.json({
        code: 0,
        message: '这些分类已经被成功删除了'
      })
    })
  } else {
    return res.end()
  }
})
router.post('/delBlogList', function (req, res, next) {
  const list = req.body.list
  if (list.length > 0) {
    return Blog.remove({'_id': {$in: list}}).then(() => {
      res.json({
        code: 0,
        message: '这些博文已经被成功删除了'
      })
    })
  } else {
    return res.end()
  }
})
router.post('/alertClassList', function (req, res, next) {
  const list = req.body.datalist
  if (list.length > 0) {
    list.forEach((item, index) => {
      return Class.update({
        className: item.oName
      }, {
        className: item.name,
        classDescription: item.desc,
        isShow: item.isShow
      }).then(() => {
        if (index === list.length - 1) {
          res.json({
            code: 0,
            message: '这些分类的信息已经被成功更改'
          })
        }
      })
    })
  } else {
    return res.end()
  }
})
router.get('/view_ctae', function (req, res, next) {
  let isAdmin = false
  if (req.cookies.logInfo) {
    isAdmin = req.cookies.logInfo.isAdmin
  }
  return Class.find().then((data) => {
    let mdata = []
    data.forEach((item) => {
      mdata.push(
        {
          name: item.className,
          show: item.isShow,
          classId: item._id
        }
      )
    })
    res.json({
      isAdmin,
      classList: mdata,
      bugId: data._id
    })
  })
})
router.post('/addBlog', (req, res, next) => {
  const from = tools.formParser()
  let username = ''
  let userId = ''
  if (!req.cookies.logInfo.isAdmin) {
    return res.send('您没有管理员权限')
  } else {
    username = req.cookies.logInfo.name
    userId = req.cookies.logInfo.userId
  }
  from.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    }
    const oldPath = files.illImg.path
    const name = files.illImg.name
    const date = tools.dateParser(new Date())
    const newPath = path.resolve(__dirname, `../../upLoads/blog/${date}/${name}`)
    fs.existsSync(path.resolve(__dirname, `../../upLoads/blog/${date}`)) === false && tools.buildFs(path.resolve(__dirname, `../../upLoads/blog/${date}`))
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        throw err
      } else {
        const rePath = `../../upLoads/blog/${date}/${name}`
        const blogData = {
          blogTitle: fields.blog_title,
          blogTex: fields.yinyu,
          blogEditor: fields.submitHtml,
          blogClass: fields.class,
          blogPic: rePath
        }
        const newBlog = new Blog({
          // 作者ID
          blogAhtuorId: userId,
          // 文章作者
          blogAhtuor: username,
          // 文章标题
          blogTitle: blogData.blogTitle,
          // 文章分类
          blogCate: blogData.blogClass,
          // 引语
          blogDesc: blogData.blogTex,
          // 插图
          illustration: blogData.blogPic,
          // 正文
          text: blogData.blogEditor,
          // 创作时间
          blogDate: new Date().valueOf(),
          // 评论
          blogComments: []
        })
        return newBlog.save().then(() => {
          res.render('message', {
            data: '恭喜您，博文保存成功'
          })
        })
      }
    })
  })
})
router.post('/addBlog_editor', (req, res, next) => {
  const form = tools.formParser()
  return form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    }
    const oldPath = files.blogImg.path
    const name = files.blogImg.name
    const date = tools.dateParser(new Date())
    const newPath = path.resolve(__dirname, `../../upLoads/blog/${date}/${name}`)
    fs.existsSync(path.resolve(__dirname, `../../upLoads/blog/${date}`)) === false && tools.buildFs(path.resolve(__dirname, `../../upLoads/blog/${date}`))
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        throw err
      } else {
        const rePath = `../../upLoads/blog/${date}/${name}`
        return res.send({
          errno: 0,
          data: [rePath]
        })
      }
    })
  })
})
router.get('/getBlogArray', (req, res, next) => {
  let page = tools.getUrlPage(req)
  const searchCate = req.query.cateId !== '0' ? {blogCate: req.query.cateId} : {}
  page = Number(page)
  Blog.countDocuments(searchCate).then((length) => {
    console.log('一共有' + length + '条数据')
    const Dpage = tools.dealWithPage(page, length)
    console.log('正确的页码是' + Dpage + '最大页码是' + Math.ceil(length / pageMaxNum))
    return Blog.find(searchCate, 'blogAhtuorId blogAhtuor blogTitle blogDesc blogDate _id starList blogComments').populate('blogAhtuorId', '_id icon_image name isAdmin level hornor').limit(pageMaxNum).skip((Dpage - 1) * pageMaxNum).sort({'blogDate': -1}).then(
      (data) => {
        data.forEach((i) => {
          // if (i.blogAhtuorId) {
          //   mdata.push({
          //     icon: i.blogAhtuorId.icon_image,
          //     level: i.blogAhtuorId.level,
          //     horor: i.blogAhtuorId.hornor
          //   })
          // }
          i.blogDate = tools.timeParser(Number(i.blogDate))
        })
        // 页码处理
        const pageData = {
          Dpage: Dpage,
          Tpage: Math.ceil(length / pageMaxNum),
          rowNum: pageMaxNum
        }
        res.json({
          code: 0,
          data,
          pageData: pageData
        })
      }
    )
  })
})
router.get('/getBlog', (req, res, next) => {
  const id = req.query.contentId
  Blog.find({_id: id}).populate('blogCate').then((data) => {
    data.forEach((i) => {
      i.blogDate = tools.timeParser(Number(i.blogDate))
      i.blogComments.forEach((ii) => {
        ii.cTime = tools.timeParser(ii.cTime)
      })
    })
    res.json({
      data
    })
  })
})
router.get('/delBlog', (req, res, next) => {
  const blogId = req.query.blogId
  return Blog.deleteOne({_id: blogId}).then(() => {
    res.json({
      code: 0,
      message: '该博文已经被成功删除'
    })
  })
})
router.post('/changeBlog', (req, res, next) => {
  const from = tools.formParser()
  if (!req.cookies.logInfo.isAdmin) {
    return res.send('您没有管理员权限')
  }
  from.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
    }
    const blogData = {
      blogTitle: fields.blog_title,
      blogTex: fields.yinyu,
      blogEditor: fields.submitHtml,
      blogClass: fields.class
    }
    if (!files.illImg) {
      console.log('插图无修改')
      const changData = {
        // 文章标题
        blogTitle: blogData.blogTitle,
        // 文章分类
        blogCate: blogData.blogClass,
        // 引语
        blogDesc: blogData.blogTex,
        // 正文
        text: blogData.blogEditor
      }
      const id = fields.blog_id
      return Blog.updateOne({_id: id}, changData).then(() => {
        res.render('message', {
          data: '恭喜您，博文修改成功'
        })
      })
    } else {
      const oldPath = files.illImg.path
      const name = files.illImg.name
      const newPath = path.resolve(__dirname, `../../upLoads/${name}`)
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          throw err
        } else {
          const rePath = `../../upLoads/${name}`
          blogData.blogPic = rePath
          const changData = {
            // 文章标题
            blogTitle: blogData.blogTitle,
            // 文章分类
            blogCate: blogData.blogClass,
            // 引语
            blogDesc: blogData.blogTex,
            // 正文
            text: blogData.blogEditor,
            illustration: blogData.blogPic
          }
          const id = fields.blog_id
          return Blog.updateOne({_id: id}, changData).then(() => {
            res.render('message', {
              data: '恭喜您，博文修改成功'
            })
          })
        }
      })
    }
  })
})
router.get('/getUserInfo', (req, res, next) => {
  if (req.cookies && req.cookies.logInfo) {
    Users.findOne({account: req.cookies.logInfo.account}).then((data) => {
      return res.json({
        code: 0,
        data: data
      })
    })
  } else {
    return res.json({
      code: -1
    })
  }
})
router.get('/delCookies', (req, res, next) => {
  res.clearCookie('logInfo')
  return res.json({
    status: 0,
    message: '您已成功退出登录'
  })
})
router.post('/submitComment', (req, res, next) => {
  const data = req.body
  Blog.findOne({_id: data.blogId}).then((blog) => {
    blog.blogComments.push(data.data)
    data.data.cTime = new Date().valueOf()
    blog.save().then((info) => {
      return res.json({
        code: 0,
        message: '发表评论成功'
      })
    })
  })
})
router.get('/updateBlogComments', (req, res, next) => {
  const bId = req.query.blogId
  Blog.findOne({_id: bId}, 'blogComments').then((list) => {
    list.blogComments.forEach((i) => {
      i.cTime = tools.timeParser(i.cTime)
    })
    return res.json({
      code: 0,
      commentList: list
    })
  })
})
router.post('/updateIcon', (req, res, next) => {
  const form = tools.formParser()
  if (!req.cookies.logInfo) {
    return res.end('您没有登录！')
  } else {
    const account = req.cookies.logInfo.account
    return form.parse(req, (err, fields, files) => {
      if (err) {
        throw err
      }
      const oldPath = files[account].path
      const name = account + new Date().valueOf() + 'Icon.' + files[account].name.split('.')[1]
      const newPath = path.resolve(__dirname, `../../upLoads/Icon/${name}`)
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          throw err
        } else {
          const rePath = `../../upLoads/Icon/${name}`
          return res.json({
            code: 0,
            path: rePath
          })
        }
      })
    })
  }
})
router.get('/doLike', (req, res, next) => {
  const account = req.query.account
  const blogId = req.query.blogId
  Blog.findOne({_id: blogId}).then((data) => {
    const exists = data.starList.some((item) => {
      return item === account
    })
    if (exists) {
      return res.json({
        code: -1,
        message: '您已点过赞了'
      })
    } else {
      data.starList.push(account)
      data.save().then(() => {
        return res.json({
          code: 0,
          message: '感谢您的点赞！'
        })
      })
    }
  })
})
router.get('/checkLike', (req, res, next) => {
  const account = req.query.account
  const blogId = req.query.blogId
  Blog.findOne({_id: blogId}, 'starList').then((data) => {
    const exists = data.starList.some((item) => {
      return item === account
    })
    return res.json({
      answer: exists
    })
  })
})
router.get('/cateBlog', (req, res, next) => {
  Class.find({}, '_id className cateIcon isShow').then((data) => {
    let idList = data.map((u) => {
      return u._id
    })
    let promiss = idList.map((uu) => {
      return Blog.find({blogCate: uu}, 'blogTitle _id').sort({'blogDate': -1}).populate('blogCate')
    })
    return Promise.all(promiss).then((pdata) => {
      Blog.findOne({blogTitle: '博客的bug反馈与后续更新计划'}).then((bug) => {
        console.log('查找bug反馈入口')
        if (bug) {
          console.log(bug._id)
          res.json({
            code: 0,
            cateBlog: pdata,
            cate: data,
            bugId: bug._id
          })
        } else {
          res.end('初始化失败，请建立bug反馈渠道')
        }
      })
    })
  })
})
module.exports = router
