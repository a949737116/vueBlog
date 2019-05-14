<style lang='less' scoped>
  @import url('../../../less/wall.less');
  .contentLi {
    background-color: #fff;
    margin-bottom: 30px;
    position: relative;
    z-index: 1;
    .articel {
      padding: 20px;
      padding-left: 70px;
      text-align: left;
      position: relative;
      overflow: hidden;
    .ribbon {
      position: absolute;
      top: 12px;
      left: -30px;
      width: 120px;
      text-align: center;
      height: 35px;
      background-color: red;
      transform:rotate(-45deg);
      span {
        color: #ffffff;
        font-size: 13px;
        vertical-align: sub;
        vertical-align: -webkit-baseline-middle;
      }
    }
      .articel-title {
        .title {font-size: 20px;}
      }
      p,.articel-desc {
        margin-top: 10px;
        padding-left: 5px;
      }
    }
    .blogWall {
      text-align: left;
      height: 5px;
      position: relative;
      img {
        position: absolute;
      }
    }
    .author {
      display: flex;
      flex-direction: row;
      padding: 15px;
      .author-head {
        flex: 0 0 60px;
        height: 70  px;
        position: relative;
        padding-top: 15px;
        box-sizing: border-box;
        text-align: left;
        img {
           border-radius: 50%;
           display: inline-block;
        }
        .author-circle{
          position: absolute;
          bottom: 0px;
          left: -10px;
        }
      }
      .author-info {
        flex: 1;
        padding-top: 10px;
        p {
          text-align: right;
          padding: 3px 15px 3px 0;
          i {
            margin-right: 2px;
          }
        }
        .info-date {
          font-size: 12px;
        }
        .info-name {
          font-weight: bold;
          font-size: 17px;
        }
      }
    }
  }
  .mobile-contentLi {
    background-color: #fff;
    padding: 10px;
    margin-bottom:20px;
    border-radius: 10px;
    .graBg(right, #60abcd, #9c74a3);
    // .graBg(left, #2C3E50, #4CA1AF);
    .mTitle {
      font-size: 18px;
      color: #ffffff;
      margin-bottom: 20px;
    }
    .mAuthor {
      font-size: 13px;
      span {
        color: #cddc39
      }
    }
    .iconfont {
      display: inline-block;
      font-size: 15px;
      margin-left: 5px;
    }
  }
  .pageRow {
    margin: 30px 0 5px 0;
  }
  .mobileTip {
    text-align: center;
    .tip-content {
      display: inline-block;
      width: 200px;
      padding: 8px;
      background-color: #fff;
      border: 2px solid #000;
      border-radius: 10px;
      text-align: center;
      font-size: 14px;
      font-family: monospace;
    }
  }
</style>
<template>
  <div>
    <div :class='customBg[randomIndex(i)].color' class='contentLi hidden-xs-only'  v-for='(u,i) in blogArray' :key='i'>
      <el-row class='contentRow'>
        <el-col :span='13'>
          <div class='articel'>
            <div class='ribbon'>
              <span>技术</span>
            </div>
            <div class='articel-head'>
              <div class='articel-title'>
                <span class='title'>
                  {{u.blogTitle}}
                </span>
              </div>
            </div>
            <div class='articel-desc'>
              {{u.blogDesc}}
            </div>
            <p>
              <span>
                <i class='icon-like icon iconfont'></i>
                {{u.starList.length}}
              </span>
              <span>
                <i class='icon-linedesign-01 icon iconfont'></i>
                {{u.blogComments.length}}
              </span>
            </p>
        </div>
        </el-col>
        <el-col :span='4'>
           <div class='blogWall'>
            <img :src='customBg[randomIndex(i)].dressUrl' alt="" width="150" height="150">
          </div>
        </el-col>
        <el-col :span='7'>
          <div class='author'>
            <div class='author-info'>
              <p class='info-name'>{{u.blogAhtuorId.name}}</p>
              <p> <i :class='`icon_image icon_level lv${u.blogAhtuorId.level}`'></i>
              <i v-if='u.blogAhtuorId.isAdmin' class='icon_image icon_admin'></i>
              <i v-if='u.blogAhtuorId.hornor.length>0' v-for='(t, n) in u.blogAhtuorId.hornor' :key='n' :class='`icon_image icon_${t}`'></i></p>
              <p class='info-date'>
                {{u.blogDate}}
              </p>
            </div>
            <div class='author-head'>
              <img :src="u.blogAhtuorId.icon_image" class="image" width='50' height='50' alt='作者头像'>
              <div class='author-circle'>
                <img :src="customBg[randomIndex(i)].frameUrl" width='70' >
              </div>
            </div>
         </div>
        </el-col>
      </el-row>
    </div>
    <div class='hidden-sm-and-up mobile-contentLi' v-for='(u,i) in blogArray' :key='"abc" + i'>
      <div class='contentRow'>
        <div class='mTitle'>
          {{u.blogTitle}}
        </div>
        <div class='mAuthor'>
          <i class='icon-yonghu icon iconfont'></i>
          <span>
            {{u.blogAhtuorId.name}}
          </span>
           <i class='icon-like icon iconfont'></i>
           <span>
              {{u.starList.length}}
           </span>
          <i class='icon-linedesign-01 icon iconfont'></i>
          <span>
            {{u.blogComments.length}}
          </span>
        </div>
      </div>
    </div>
    <div class='hidden-sm-and-up mobileTip'>
      <div class='tip-content'>
        tip:左右滑动屏幕进行翻页
      </div>
    </div>
    <!-- <div class='pageRow'>
      <el-pagination
        ref='page'
        background
        layout="prev, pager, next"
        pager-count = 5
        :page-count= 'pageData.Tpage'
        :page-size = 'pageData.rowNum'
        :current-page = 'pageData.Dpage'
        @prev-click = 'prevClick'
        @next-click = 'nextClick'
        @current-change = 'pageChange'
      >
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
// import BScroller from 'better-scroll'
import bus from '../../../eventBus/index.js'
import ts from '../../../common/js/touchEvent.js'
export default{
  name: 'contentHome',
  data () {
    return {
      blogArray: [],
      pageData: {
        // Dpage
        // Tpage
        // rowNum
      },
      customBg:[
        {color: 'wallYellow',
         dressUrl: '/data/yellow.png',
         frameUrl: '/data/yellowPane.png'
        },
        {color: 'wallPink',
         dressUrl: '/data/pink.png',
         frameUrl: '/data/pinkPane.png'
        },
        {color: 'wallBlue',
         dressUrl: '/data/blue.png',
         frameUrl: '/data/bluePane.png'
        },
         {color: 'wallRed',
         dressUrl: '/data/red.png',
         frameUrl: '/data/redPane.png'
        }
      ]
    }
  },
  methods: {
    prevClick () {
      if (this.pageData.Dpage <= 1) {
        this.$message({
          message: '已无上一页',
          type: 'warning',
          showClose: true
        })
        return false
      }
      const cateId = this.$route.query.cateId || 0
      bus.$emit('toload', true)
      // this.scroll.scrollTo(0, 0, 0)
      this.$http.get(`/api/getBlogArray?page=${this.pageData.Dpage - 1}&cateId=${cateId}`).then((data) => {
        bus.$emit('toload', false)
        console.log(data.body.data)
        this.pageData = data.body.pageData
        this.blogArray = data.body.data
        // this.scroll.refresh()
      })
    },
    nextClick () {
      if (this.pageData.Dpage >= this.pageData.Tpage) {
        this.$message({
          message: '已无下一页',
          type: 'warning',
          showClose: true
        })
        return false
      }
      const cateId = this.$route.query.cateId || 0
      bus.$emit('toload', true)
      // this.scroll.scrollTo(0, 0, 0)
      this.$http.get(`/api/getBlogArray?page=${this.pageData.Dpage + 1}&cateId=${cateId}`).then((data) => {
        bus.$emit('toload', false)
        console.log(data.body.data)
        this.pageData = data.body.pageData
        this.blogArray = data.body.data
        // this.scroll.refresh()
      })
    },
    pageChange () {
      bus.$emit('toload', true)
      // this.scroll.scrollTo(0, 0, 0)
      const cateId = this.$route.query.cateId || 0
      this.$http.get(`/api/getBlogArray?cateId=${cateId}&page=${this.$refs.page.internalCurrentPage}`).then((data) => {
        console.log(data.body)
        bus.$emit('toload', false)
        this.pageData = data.body.pageData
        this.blogArray = data.body.data
        // this.scroll.refresh()
      })
    },
    getBlogArray () {
      // const me = this
      const cateId = this.$route.query.cateId || 0
      // if (!me.scroll) {
      //   me.scroll = new BScroller('#Vmain', {
      //     scrollY: true,
      //     click: true
      //   })
      // }
      bus.$emit('toload', true)
      this.$http.get(`/api/getBlogArray?page=1&cateId=${cateId}`).then((data) => {
        console.log(data.body)
        this.pageData = data.body.pageData
        this.blogArray = data.body.data
        this.$nextTick(() => {
          // me.scroll.refresh()
          // me.scroll.scrollTo(0, 0, 2000)
          bus.$emit('toload', false)
          // this.$message({
          //   message: '浏览器兼容问题正在解决中，建议您使用谷歌浏览器进行访问，多谢理解！',
          //   type: 'warning',
          //   duration: 10000,
          //   showClose: true,
          //   center: true
          // })
          // this.$notify({
          //   title: '温馨提醒',
          //   message: '按住列表滑动即可实现上下滚动',
          //   type: 'info',
          //   position: 'bottom-left',
          //   duration: 10000,
          //   customClass: 'notifyMessage'
          // })
        })
      })
    },
    randomIndex (i) {
      const index = i % 4;
      return index  
    }
  },
  mounted () {
    const me = this
    this.$nextTick(() => {
      console.log(123)
      me.getBlogArray()
    })
  },
  created () {
    const me = this;
    ts.init(me.prevClick,me.nextClick)
  },
  watch: {
    $route: {
      deep: true,
      handler: 'getBlogArray'
    }
  }
}
</script>
