<template>
  <div id='essay'>
    <div style='background-color:#fff' class='outermost editor'>
      <!-- 标题 -->
      <h1 @click='refrshDiv'>{{content.blogTitle}}</h1>
      <!-- 文章信息 -->
      <div class='essayMessage'>
            <div>
              <i class="icon iconfont icon-login_user"></i><span id='writer'>
                {{content.blogAhtuor}}</span>
            </div>
            <div>
              <i class="el-icon-info type"></i><span id='class'>WEB前端</span>
            </div>
            <div>
              <i class="el-icon-time time"></i><span>{{content.blogDate}}</span>
            </div>
            <div>
              <i class="icon-wenzhang1 icon iconfont"></i><span>50</span>
            </div>
            <div>
              <i class="icon-like icon iconfont"></i><span>2</span>
            </div>
      </div>
      <!-- 内容 -->
      <div class='essayContent' v-html='content.text'>
          {{content.text}}
      </div>
      <!-- 评论区 -->
    </div>
    <div style='margin-top:50px'>
        <pinglun></pinglun>
    </div>
  </div>
</template>
<script>
import pinglun from '@components/commonComponents/pinglun/pinglun'
import bus from '@/eventBus/index.js'
export default{
  name: 'essay',
  data () {
    return {
      content: {}
    }
  },
  components: {
    pinglun
  },
  created () {
    const cid = this.$route.query.contentId
    this.$http.get(`/api/getBlog?contentId=${cid}`).then((data) => {
      console.log(data.body)
      if (data.body.data.length > 1) {
        console.log('数据获取出错')
      } else {
        this.content = data.body.data[0]
        this.$nextTick(() => {
          bus.$emit('refrshDiv')
        })
      }
    })
  },
  methods: {
    refrshDiv () {
      bus.$emit('refrshDiv')
    }
  }
}
</script>
<style scoped lang='less'>
#essay {
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
