const Users = require('../../dbModel/user')
const Class = require('../../dbModel/class')
const express = require('express')
const router = express.Router()
const defualtExtraOption = {
  icon_image: '/data/question.png',
  level: 0,
  isAdmin: false,
  email: '',
  tel: '',
  adress: '',
  city: '',
  essayNum: ''
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
        console.log('已存在该账号')
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
          console.log(feedBack)
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
  console.log(data)
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
        console.log(fData)
        if (data.password !== fData.password || data.password !== fData.rPassword) {
          res.json({
            status: -1,
            tip: '登陆密码错误，请检查您的密保信息'
          })
        } else {
          res.cookie('logInfo', {
            account: data.account,
            isAdmin: fData.isAdmin,
            name: fData.name
          }, {
            'maxAge': 1000000
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
        value: 'guizu',
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
  console.log(data)
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
  console.log(req.query.account)
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
  console.log(req.query.account)
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
          isShow: postData.isShow
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
router.post('/alertClassList', function (req, res, next) {
  const list = req.body.datalist
  if (list.length > 0) {
    list.forEach((item, index) => {
      console.log(item)
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
module.exports = router
