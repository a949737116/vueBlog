<template>
  <div id='pinglun'>
    <!-- 评论展示 -->
    <div>
      <!-- 单条 -->
      <div class='pl-item' v-for='(u, i) in pinglun' :key='i'>
        <!-- 左边头像 -->
        <div class='pl-head'>
          <img :src="u.userImg" class="image">
        </div>
        <!-- 右边信息 -->
        <div class='pl-substance'>
          <!-- 名字加图标 -->
          <div class='comment'>
            <span class='cm-name'>{{u.userName}}</span>
            <i class='icon_image icon_head'></i>
            <i class='icon_image icon_vip6'></i>
            <i class='icon_image icon_hot'></i>
            <span class='cm-name'>：</span>
            <span class='cn-comment'>
              {{u.comment}}
            </span>
          </div>
          <!-- 回复时间 -->
          <p class='commit-date'>
            {{u.cTime}}
          </p>
        </div>
      </div>
      <!-- 输入评论 -->
      <div class='pl-commit pl-item'>
        <div class='pl-cover' :class='loginerInfo.isLogin? "hidden" : ""'>
          <div class='pl_cover'>
            <div>
              请先登录/注册你的账号才能发表评论。
            </div>
          </div>
        </div>
        <div class='pl-head'>
          <img :src='loginerInfo.icon_image' class="image">
        </div>
        <div class='yourCommit'>
          <el-input
            id="commentData"
            resize='none'
            type="textarea"
            :rows="2"
            placeholder="请发表您的精彩观点"
            v-model="textarea">
          </el-input>
          <div>
            <el-button type="primary" style='float:right;margin-top:10px' @click='submitComment' size='small' class='clear'>发表</el-button>
          </div>
        </div>
      </div>
       <div style='padding:0px 35px 30px;position: relative;text-align:right'>
          <span style='font-size:13px;color:#ccc'>点个赞吧</span>
          <el-button style='margin-top:10px' @click='doLike' :icon="like?'el-icon-check':'el-icon-star-off'" :type='like?"success":""' circle size='small'></el-button>
        </div>
    </div>
  </div>
</template>
<script>
import bus from '@/eventBus/index.js'
export default{
  name: 'pinglun',
  props: {
    aId: String,
    pinglun: Array
  },
  data () {
    return {
      textarea: '',
      like: false
    }
  },
  methods: {
    checkLogin () {
      if (!this.loginerInfo.isLogin || !this.loginerInfo.account || !this.loginerInfo.name) {
        return false
      } else {
        return true
      }
    },
    submitComment () {
      if (!this.checkLogin()) {
        this.$message.error('请先登录')
        return
      }
      console.log(this.textarea.replace(/(^\s*)|(\s*$)/g, ''))
      if (!this.textarea.replace(/(^\s*)|(\s*$)/g, '')) {
        this.$message.error('请不要提交空白评论哦')
      } else {
        bus.$emit('toload', true)
        this.$http.post('/api/submitComment', {
          blogId: this.aId,
          data: {
            comment: this.textarea,
            userName: this.loginerInfo.name,
            userImg: this.loginerInfo.icon_image
          }
        }, {emulateJSON: true}).then((data) => {
          bus.$emit('toload', false)
          if (data.body.code === 0) {
            this.$message.success(data.body.message)
            bus.$emit('upDateComments')
          }
        })
      }
    },
    doLike () {
      if (!this.loginerInfo.account) {
        this.$message.error('请先登录才能点赞噢')
      } else {
        bus.$emit('toload', true)
        this.$http.get(`/api/doLike?account=${this.loginerInfo.account}&blogId=${this.aId}`).then((fb) => {
          bus.$emit('toload', false)
          if (fb.body.code === 0) {
            this.$message.success(fb.body.message)
            this.like = true
          } else {
            this.$message.error(fb.body.message)
          }
        })
      }
    }
  },
  created () {
    this.$nextTick(() => {
      bus.$emit('toload', true)
      this.$http.get(`/api/checkLike?account=${this.loginerInfo.account}&blogId=${this.aId}`).then((fb) => {
        bus.$emit('toload', false)
        this.like = fb.body.answer
      })
    })
  },
  computed: {
    loginerInfo () {
      return this.$store.state.loginInfo
    }
  }
}
</script>
<style scoped lang='less'>
#pinglun {
  background-color:#f2f2f5;
  .pl-item {
    padding: 20px 35px 20px;
    flex-direction: row;
    display: flex;
    .pl-head {
      .image {
        border-radius: 50%;
        box-shadow: 3px 3px 5px #888888;
      }
      padding-top: 5pxs;
      flex:50px 0 0;
      width: 50px;
      margin-right: 5px;
    }
    .pl-substance {
      box-shadow: 1px 1px 6px #903232;
      border-radius: 4px;
      padding: 5px 10px 5px 10px;
      background-color: #fff;
      .comment {
        text-align: left;
        .cm-name {
          color: #712898;
          font-size: 14px;
          vertical-align: top;
          line-height: 23px;
          font-weight: 600;
        }
       .cn-comment {
         vertical-align: top;
          text-align: left;
          padding: 0 0 2px;
          line-height: 23px;
          font-size: 14px;
          font-family: Microsoft Yahei;
        }
      }
      .commit-date{
        padding-top: 2px;
        text-align: right;
        font-size: 13px;
        color: #808080;
      }
    }
  }
  .pl-commit {
    padding: 20px 35px 0px;
    position: relative;
    .pl-cover{
      box-sizing: border-box;
      padding: 15px 30px 0px;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 999;
      height: 100%;
      .pl_cover {
        color: #fff;
        background-color: #583e3e;
        opacity: 0.8;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center
      }
    }
    .yourCommit{
      flex: auto 1 1;
       #commentData {
        padding: 5px 2px 0px 6px;
        width: 100%;
        border-style: solid;
        border-width: 1px;
        font-size: 12px;
        word-wrap: break-word;
        line-height: 18px;
        overflow: hidden;
        outline: none;
        height: 53px;
        color: #808080;
        text-decoration: none;
        // 禁止拉伸
        resize:none;
      }
    }
  }
}
</style>
