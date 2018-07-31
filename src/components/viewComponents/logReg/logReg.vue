<template>
  <div id='logReg'>
      <el-tabs v-model="state"  type="border-card" style='border-radius: 9px;'>
        <el-tab-pane label="登录" name="log">
          <div class='loginBox'>
            <div class='loginRow1'>
              <el-input
              placeholder="请输入用户名"
              suffix-icon="icon-login_user"
              class='icon iconfont'
              >
              </el-input>
            </div>
            <div class='loginRow2'>
              <el-input
              type='password'
              placeholder="请输入密码"
              suffix-icon="icon-key"
              class='icon iconfont'
              >
              </el-input>
            </div>
            <div class='loginRow3'>
              <el-button>清空</el-button>
              <el-button type="primary">登录</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="注册" name="red">
          <div class='regBox'>
            <el-form ref="form" :model="form" label-width="50px">
              <el-form-item label="账号:">
                <el-input
                v-model="form.account"
                placeholder="请输入您的账号"
                ></el-input>
              </el-form-item>
               <el-form-item label="密码:">
                <el-input
                v-model="form.password"
                placeholder="请输入您的密码"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                v-model="form.password"
                placeholder="请重新输入您的密码"
                ></el-input>
              </el-form-item>
               <el-form-item label="昵称:">
                <el-input
                v-model="form.account"
                placeholder="请输入您的用户名"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别:">
                <el-radio v-model="form.sex" label='m'>男</el-radio>
                <el-radio v-model="form.sex" label='fm'>女</el-radio>
              </el-form-item>
              <el-form-item label="职业:">
                 <el-select v-model="form.status" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
export default{
  name: 'logReg',
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
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
          'label': '行政人员',
          'value': '02'
        }
      ],
      form: {
        accout: '',
        name: '',
        password: '',
        sex: 'fm'
      }
    }
  }
}
</script>
<style scoped lang='less'>
  #logReg{
    .loginBox {
        padding: 10px;
        div {
          margin-bottom: 8px
        }
        .loginRow3 {
          text-align: right
        }
      }
  }
</style>
