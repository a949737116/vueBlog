<template>
  <div id='logReg'>
      <el-tabs v-model="state"  type="border-card" style='border-radius: 9px;'>
        <el-tab-pane label="登录" name="log">
          <div class='loginBox'>
            <div class='loginRow1'>
              <el-input
              placeholder="请输入账号"
              suffix-icon="icon-login_user"
              class='icon iconfont'
              maxlength=20
              auto-complete = 'off'
              v-model='loginInfo.account'
              >
              </el-input>
            </div>
            <div class='loginRow2'>
              <el-input
              type='password'
              placeholder="请输入密码"
              suffix-icon="icon-key"
              class='icon iconfont'
              auto-complete = 'off'
              maxlength=20
              v-model='loginInfo.password'
              >
              </el-input>
            </div>
            <div class='loginRow3' style='margin-top:5px'>
              <el-button @click='toRestart("log")'>清空</el-button>
              <el-button type="primary" @click='enterLogin'>登录</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="注册" name="red">
          <div class='regBox'>
            <el-form ref="regForm" :model="form" label-width="50px">
              <i class='icon_image icon_avatar left colorIcon'></i>
              <el-form-item>
                <el-input
                v-model="form.account"
                placeholder="请输入您的账号"
                @focus='getFocus("account")'
                max=20
                ></el-input>
              </el-form-item>
              <i class='icon_image icon_key left colorIcon'></i>
               <el-form-item>
                <el-input
                v-model="form.password"
                placeholder="请输入您的密码"
                type="password"
                @focus='getFocus("pw1")'
                max=20
                ></el-input>
              </el-form-item>
              <i class='icon_image icon_key left colorIcon'></i>
              <el-form-item>
                <el-input
                v-model="form.rPassword"
                placeholder="请重新输入您的密码"
                @focus='getFocus("pw2")'
                type="password"
                max=20
                ></el-input>
              </el-form-item>
              <i class='icon_image icon_id-card left colorIcon'></i>
               <el-form-item>
                <el-input
                v-model="form.name"
                placeholder="请输入您的用户名"
                maxlength=12
                @focus='getFocus("name")'
                ></el-input>
              </el-form-item>
              <i class='icon_image icon_gender left colorIcon'></i>
              <el-form-item>
                <el-radio v-model="form.sex" label='m' style='margin-left:8px;'>男</el-radio>
                <el-radio v-model="form.sex" label='fm' style='margin-left:10px;'>女</el-radio>
              </el-form-item>
              <i class='icon_image icon_hiring left colorIcon'></i>
              <el-form-item>
                 <el-select v-model="form.job" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style='margin-top:10px'>
                <el-button @click="toRestart('reg')">重置</el-button>
                <el-button type="primary" @click="checkout">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
import bus from '../../../eventBus/index.js'
export default{
  name: 'logReg',
  data () {
    return {
      state: 'log',
      options: [
        {
          'label': '学生',
          'value': '00'
        },
        {
          'label': '从业人员',
          'value': '01'
        },
        {
          'label': '兴趣人群',
          'value': '02'
        },
        {
          'label': '其他',
          'value': '03'
        }

      ],
      form: {
        account: '',
        name: '',
        password: '',
        rPassword: '',
        sex: 'm',
        job: ''
      },
      loginInfo: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    enterLogin () {
      const me = this
      if (!this.loginInfo.account || !this.loginInfo.password) {
        me.openAlert('登陆信息不完整')
        return
      } else {
        let sendData = this.loginInfo
        sendData.inspected = true
      }
      bus.$emit('toload', true)
      this.$http.post('/api/goToLogin', this.loginInfo, {emulateJSON: true}).then(function (fb) {
        bus.$emit('toload', false)
        console.log(fb.body)
        if (fb.body.status === -1) {
          me.openAlert(fb.body.tip, 'error')
        } else if (fb.body.status === 0) {
          me.openHint(fb.body.tip)
          this.$emit('lrCipher')
          fb.body.info.Logined = true
          this.$store.commit('enterLogin', fb.body.info)
          me.openMessage('点击你的昵称可以修改个人信息哦', 'success')
        }
      })
    },
    toRestart (fName) {
      const me = this
      if (fName === 'reg') {
        me.form = {
          account: '',
          name: '',
          password: '',
          rPassword: '',
          sex: 'm',
          job: ''
        }
      } else {
        this.loginInfo = {
          account: '',
          password: ''
        }
      }
    },
    isTest (text) {
      const reg = /^[a-zA-Z0-9]{6,20}$/
      return reg.test(text)
    },
    checkout () {
      /* 检验规则
      账号：密码由英文和数字组成，不得包含中文和特殊符号。
      用户名：用户名长度不得超过十二位。
      密码 密码由英文和数字组成，不得包含中文和特殊符号。
      */
      const regObject = this.form
      const me = this
      // 存在漏填
      if (!regObject.job || !regObject.name || !regObject.password || !regObject.rPassword || !regObject.sex || !regObject.account) {
        me.openAlert('注册资料存在漏填项')
      // 密码重复
      } else if (regObject.password !== regObject.rPassword) {
        me.openAlert('两次输入的密码不一致')
      // 账号错误
      } else if (regObject.account.length > 20 || regObject.account.length < 6 || !me.isTest(regObject.account)) {
        me.openAlert('账号应是6位到20位的英文字母和数字')
      // 密码错误
      } else if (regObject.password.length > 20 || regObject.password.length < 6 || !me.isTest(regObject.password)) {
        me.openAlert('密码应是6位到20位的英文字母和数字')
      // 用户名错误
      } else if (regObject.name.length >= 12) {
        me.openAlert('用户名填写不符合要求')
      } else {
        regObject.inspected = true
        me.sumbitReg(regObject)
      }
    },
    sumbitReg (data) {
      const me = this
      bus.$emit('toload', true)
      this.$http.post('/api/goToReg', data, {emulateJSON: true}).then(function (fb) {
        console.log(fb.body)
        bus.$emit('toload', false)
        if (fb.body.status === -1) {
          me.openAlert(fb.body.tip, 'error')
        } else if (fb.body.status === 0) {
          me.openHint(fb.body.tip)
          me.toRestart('reg')
          setTimeout(function () {
            window.location.reload()
          }, 1000)
        }
      }).then(function (error) {
        bus.$emit('toload', false)
        console.log(error)
      })
    },
    openHint (tip, type) {
      type = type || 'success'
      this.$message({
        message: tip,
        type: type
      })
    },
    openAlert (tip, type) {
      type = type || 'warning'
      this.$alert(tip, '提示', {
        confirmButtonText: '确定',
        type: type
      })
    },
    openMessage (message, type) {
      this.$notify({
        title: '温馨提醒',
        message,
        type,
        position: 'bottom-left',
        duration: 5000,
        customClass: 'notifyMessage'
      })
    },
    getFocus (type) {
      const me = this
      switch (type) {
        case 'name' :
          me.openMessage('用户名长度不得超过十二位', 'warning')
          break
        case 'pw1' :
          me.openMessage('密码由6-20位英文和数字组成，不得包含中文和特殊符号', 'warning')
          break
        case 'pw2' :
          me.openMessage('请重新输入您刚刚输入的密码', 'info')
          break
        case 'account' :
          me.openMessage('账号由6-20位英文和数字组成，不得包含中文和特殊符号', 'warning')
          break
        default :
          console.log('怎么跑到这里来了')
      }
    }
  },
  created () {
    const me = this
    bus.$emit('toload', true)
    this.$http.get('/api/getUserInfo').then((fb) => {
      bus.$emit('toload', false)
      if (fb.body.code === 0) {
        console.log(fb)
        this.$emit('lrCipher')
        fb.body.data.Logined = true
        this.$store.commit('enterLogin', fb.body.data)
        me.openMessage('点击你的昵称可以修改个人信息哦', 'success')
      }
    })
  }
}
</script>
<style scoped lang='less'>
  #logReg{
    .loginBox {
        padding: 5px;
        div:first-child {
          margin-bottom: 5px
        }
        .loginRow3 {
          text-align: right
        }
      }
    .regBox {
      .colorIcon {
        line-height: 40px;
        height: 40px;
        display: inline-block;
      }
      .icon_image {
        background-size: 28px 28px;
        width: 28px;
        height: 28px;
        margin-top: 6px;
        vertical-align: middle;
        display: inline-block;
        background-repeat: no-repeat;
      }
    }
  }
</style>
