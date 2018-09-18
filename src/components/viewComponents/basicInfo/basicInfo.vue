<template>
  <div id='basicInfo'>
    <div class='BI_row1'>
      <span>个人信息</span>
      <p></p>
    </div>
    <div class='BI_row2'>
      <div class="right" style='padding-right:5px;text-align:center'>
        <el-upload
          class="avatar-uploader"
          action="api/updateIcon"
          :name= data.account
          :before-upload='checkFile'
          :on-success='upDateSuccess'
          :on-error='upDateFail'
          accept='image/png, image/jpeg, image/gif, image/jpg'
          :show-file-list="false"
          >
          <img v-if="data.icon_image" :src="data.icon_image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-tag>图片大小不超过3M</el-tag>
      </div>
      <div>
        <span>我的账号：</span>
        <input type="text" disabled :value='data.account'>
        <span class='cipher'>*</span>
      </div>
      <div>
        <span>我的昵称：</span>
        <input type="text" disabled :value='data.name'>
        <span class='cipher'>*</span>
      </div>
      <div>
        <span>我的邮箱：</span>
        <input type="text" v-model='data.email'>
      </div>
      <div>
        <span>联系电话：</span>
        <input type="text" v-model='data.tel'>
      </div>
      <div>
        <span>居住地址：</span>
        <input type="text" v-model='data.adress'>
      </div>
      <div>
        <span>我的性别：</span>
        <el-radio v-model='data.sex'  label="m">男</el-radio>
        <el-radio v-model='data.sex' label="fm">女</el-radio>
      </div>
      <div style='margin-bottom:0px'>
        <span>我的职业：</span>
        <el-select  placeholder="请选择" class='jobSelect' v-model="data.job">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div style='margin-bottom:0px'>
        <span>所在省份：</span>
        <el-select  placeholder="请选择" class='jobSelect' v-model='data.city'>
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class='cipher'>提示 ：带*号的信息不可被更改</div>
      <el-button size="mini" class='right' @click='submit'>提交</el-button>
    </div>
  </div>
</template>
<script>
import bus from '../../../eventBus/index.js'
export default {
  name: 'basicInfo',
  data () {
    return {
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
      options2: []
    }
  },
  created () {
    bus.$emit('toload', true)
    this.$http.get('/api/getProvince').then(function (pdata) {
      bus.$emit('toload', false)
      console.log(pdata.body.provinceList)
      this.options2 = pdata.body.provinceList
    })
  },
  computed: {
    data () {
      return this.$store.state.loginInfoSumbit
    }
  },
  methods: {
    refreshStore (number) {
      bus.$emit('toload', true)
      this.$http.get('/api/getPersonalData', {params: {account: number}}).then(function (fb) {
        bus.$emit('toload', false)
        console.log(fb)
        this.$store.commit('enterLogin', fb.body.info)
      })
    },
    submit () {
      const me = this
      const sendData = {
        verifier: true,
        account: this.data.account,
        info: {
          sex: this.data.sex,
          job: this.data.job,
          icon_image: this.data.icon_image,
          email: this.data.email,
          tel: this.data.tel,
          adress: this.data.adress,
          city: this.data.city
        }
      }
      bus.$emit('toload', true)
      this.$http.post('/api/supplement', sendData, {emulateJSON: true}).then(function (fb) {
        bus.$emit('toload', false)
        console.log(fb.body)
        if (fb.body.status === 0) {
          this.$alert(fb.body.tip, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              me.refreshStore(this.data.account)
            },
            type: 'success'
          })
          setTimeout(function () {
            window.location.reload()
          }, 1000)
        } else {
          this.$alert(fb.body.tip, '提示', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
      /* 传输数据结构
      data = {
        // 检验
        verifier,
        // 账号
        account,
        // 修改信息
        info: {
          sex
          job
          icon_image
          email
          tel
          adress
          city }
          }
        */
    },
    checkFile (file) {
      console.log(file)
      let ifType = false
      let ifSize = true
      if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/jpg') {
        ifType = true
      }
      if (file.size / 1024 / 1024 > 3) {
        ifSize = false
      }
      if (!ifType) {
        this.$message.error('上传文件类型必须是图片类型')
      }
      if (!ifSize) {
        this.$message.error('文件大小过大')
      }
      return ifType && ifSize
    },
    upDateSuccess (result) {
      console.log(result)
      this.data.icon_image = result.path
    },
    upDateFail () {
      this.$message.error('上传图片失败')
    }
  }
}
</script>
<style lang='less' scoped>
  #basicInfo {
    .cipher {
      color: red;
      font-size: 12px!important;
      vertical-align: bottom;
    }
    input {
      text-indent: 5px;
      line-height: 15px;
    }
    input:disabled {
      color:#aba8a8;
    }
    padding: 20px;
    background-color: #fff;
    .BI_row1 {
      text-align: left;
      span {
        font-size: 14px;
        font-weight: 600;
      }
      p {
        height: 3px;
        margin-top: 5px;
        background-color: red
      }
    }
    .BI_row2 {
      padding: 20px 5px;
      text-align: left;
      div {
        margin-bottom:10px;
        font-size:13px
      }
    }
  }
</style>
