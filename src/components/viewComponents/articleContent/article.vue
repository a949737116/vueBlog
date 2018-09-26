<template>
  <div id='essay'>
    <div class='figure' v-if='content.illustration'>
      <img :src="content.illustration" style='width:100%;height:auto'>
    </div>
    <div style='background-color:#fff' class='outermost editor'>
      <!-- 标题 -->
      <h1>{{content.blogTitle}}</h1>
      <!-- 文章信息 -->
      <div class='essayMessage'>
            <div>
              <i class="icon iconfont icon-login_user"></i><span id='writer'>
                {{content.blogAhtuor}}</span>
            </div>
            <div>
              <i class="el-icon-info type"></i><span id='class' v-if='content.blogCate'>{{content.blogCate.className}}</span>
            </div>
            <div>
              <i class="el-icon-time time"></i><span>{{content.blogDate}}</span>
            </div>
            <div>
              <i class="icon-wenzhang1 icon iconfont"></i><span v-if='content.blogComments'>{{content.blogComments.length}}</span>
            </div>
            <div>
              <i class="icon-like icon iconfont"></i><span v-if='content.starList'>{{content.starList.length}}</span>
            </div>
      </div>
      <!-- 内容 -->
      <div class='essayContent' v-html='content.text'>
          {{content.text}}
      </div>
      <!-- 评论区 -->
    </div>
    <div style='margin-top:30px'>
        <pinglun :aId = blogId :pinglun = content.blogComments></pinglun>
    </div>
  </div>
</template>
<script>
import BScroller from 'better-scroll'
import pinglun from '@components/commonComponents/pinglun/pinglun'
import bus from '@/eventBus/index.js'
export default{
  name: 'essay',
  data () {
    return {
      content: {},
      blogId: ''
    }
  },
  components: {
    pinglun
  },
  mounted () {
    const me = this
    bus.$on('upDateComments', () => {
      bus.$emit('toload', true)
      me.$http.get(`/api/updateBlogComments?blogId=${me.blogId}`).then((cb) => {
        bus.$emit('toload', false)
        if (cb.body.code === 0) {
          me.content.blogComments = cb.body.commentList.blogComments
        }
      })
    })
  },
  created () {
    this.getContent()
  },
  methods: {
    getContent () {
      const me = this
      const cid = this.$route.query.contentId
      this.blogId = cid
      bus.$emit('toload', true)
      this.$http.get(`/api/getBlog?contentId=${cid}`).then((data) => {
        bus.$emit('toload', false)
        console.log(data.body)
        if (data.body.data.length > 1) {
          console.log('数据获取出错')
        } else {
          this.content = data.body.data[0]
          this.$notify({
            title: '温馨提醒',
            message: '按住文章滑动即可实现上下滚动',
            type: 'info',
            position: 'bottom-left',
            duration: 5000,
            customClass: 'notifyMessage'
          })
          this.$nextTick(() => {
            if (me.scroll) {
              me.scroll.refresh()
              me.scroll.scrollTo(0, 0, 2000)
            } else {
              me.scroll = new BScroller('#Vmain', {
                scrollY: true,
                click: true
              })
            }
            let imgs = document.getElementsByTagName('img')
            for (var i = 0; i < imgs.length; i++) {
              imgs[i].onload = function () {
                if (me.scroll) {
                  me.scroll.refresh()
                  me.scroll.scrollTo(0, 0, 2000)
                } else {
                  me.scroll = new BScroller('#Vmain', {
                    scrollY: true,
                    click: true
                  })
                }
              }
            }
          })
        }
      })
    }
  },
  watch: {
    $route: {
      handler: 'getContent',
      deep: true
    }
  }
}
</script>
<style scoped lang='less'>
#essay {
  padding-bottom: 60px;
  .outermost {
    font-family: Microsoft Yahei;
    padding: 20px 35px;
    h1 {
        margin: 0 0 12px;
        font-size: 30px;
        word-wrap: break-word;
        color: #000;
        font-weight: 400;
    }
    .essayMessage {
      margin:15px 0 20px 0;
      div {
        display: inline-block;
        margin-right: 10px;
        .icon-login_user {
          color: indianred
        }
        .type {
          color:#97a7e3;
        }
        .icon-wenzhang1{
          color: #b0b01f
        }
        .icon-like {
          color: orange
        }
        i {
          margin-right: 5px
        }
        span {
          font-size: 12px;
          color: #808080
        }
        #writer {
          color: orange;
          font-weight: 500;
          font-size: 14px
        }
         #class {
          color: #3a8ee6
        }
      }
    }
    .essayContent {
      font-size: 16px;
      line-height: 1.65;
      word-wrap: break-word;
    }
  }
}
</style>
