const Users = require('../../dbModel/user')
const express = require('express')
const router = express.Router()
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
      } else {
        var userInfo = new Users(data)
        userInfo.save().then(function (feedBack) {
          console.log(feedBack)
          res.json({
            status: 0,
            tip: '恭喜您，您已注册成功'
          })
        }).then(function (err) {
          console.log(err)
          res.json({
            status: -1,
            tip: '注册失败'
          })
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
          res.json({
            status: 0,
            tip: '恭喜您登陆成功'
          })
        }
      }
    })
  }
})
module.exports = router
