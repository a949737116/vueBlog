<style lang='less' scoped>
  .contentList {
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 30px;
    .contentRow {
      .contentTop {
        padding: 20px 20px 4px;
        display: flex;
        flex-direction: row;
        margin-bottom: 5px;
        .topLeft{
          flex: 50px 0 0;
          width: 50px;
          height: 50px;
        }
        .topRight{
          text-align: left;
          margin-left: 10px;
          .authorRow{
            margin-bottom: 7px;
            .name{
              vertical-align: top;
              font-size: 18px;
              color: #333;
              font-weight: 700;
            }
            i {
              margin-right: 2px
            }
          }
          .artInfoRow{
            color: #a5a4a4;
            font-size: 13px;
            margin-bottom: 5px;
          }
          .title {
            color: #aa4343;
            font-family: STHeiti;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .articleRow{
            line-height: 18px;
            font-size: 13px;
            color: #333;
            font-weight: 400;
            font-family: Microsoft Yahei
          }
        }
      }
      .contentBottom{
        border-top-width: 1px;
        border-top-style: solid;
        border-color: #f2f2f5;
        padding: 7px;
        font-size: 12px;
        vertical-align: top;
        color: #808080;
        div {
          height: 20px;
          line-height: 20px;
          border-color: #d9d9d9;
          border-left-width: 1px;
          border-left-style: solid;
          &:first-child {
            border: none
          }
        }
        span {
          margin-left: 2px;
        }
        i {
          display: inline-block
        }
        a {
          color:#808080;
          text-decoration: none
        }
        a:hover{
          cursor: pointer;
          color:#b33023;
        }
      }
    }
  }
  .pageRow {
    margin: 30px 0 5px 0;
  }
</style>
<template>
  <div>
    <div class='contentList' v-for='(u,i) in blogArray' :key='i'>
      <div class='contentRow'>
        <div class='contentTop'>
          <div class='topLeft'>
            <!-- 头像栏 -->
            <img :src="u.blogAhtuorId.icon_image" class="image" width='50' height='50'>
          </div>
          <div class='topRight'>
            <!-- 作者信息 -->
            <div class='authorRow clear'>
              <span class='name'>{{u.blogAhtuorId.name}}</span>
              <i :class='`icon_image icon_level lv${u.blogAhtuorId.level}`'></i>
              <i v-if='u.blogAhtuorId.isAdmin' class='icon_image icon_admin'></i>
              <i v-if='u.blogAhtuorId.hornor.length>0' v-for='(t, n) in u.blogAhtuorId.hornor' :key='n' :class='`icon_image icon_${t}`'></i>
            </div>
            <!-- 作品信息 -->
            <div class='artInfoRow'>
              {{u.blogDate}}
            </div>
            <!-- 作品标题 -->
            <p class='title'>{{u.blogTitle}}</p>
            <!-- 作品简介 -->
            <div class='articleRow'>
              {{u.blogDesc}}
            </div>
          </div>
        </div>
        <div class='contentBottom'>
          <el-row>
            <el-col :span="8">
              <div>
                <router-link :to="'/blog?contentId='+u._id">
                  <i class='icon-wenzhang1 icon iconfont'></i>
                  <span>全文</span>
                </router-link>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <!-- <i class='icon-like icon iconfont'></i> -->
                <span>点赞数：{{u.starList.length}}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <!-- <i class='icon-linedesign-01 icon iconfont'></i> -->
                <span>评论数：{{u.blogComments.length}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class='pageRow'>
          <el-pagination
            ref='page'
            background
            layout="prev, pager, next"
            :total= 'pageData.Tpage'
            :page-size = 'pageData.rowNum'
            :current-page = 'pageData.Dpage'
            @prev-click = 'prevClick'
            @next-click = 'nextClick'
            @current-change = 'pageChange'
          >
          </el-pagination>
    </div>
  </div>
</template>
<script>
import BScroller from 'better-scroll'
import bus from '../../../eventBus/index.js'
export default{
  name: 'contentHome',
  data () {
    return {
      blogArray: [],
      pageData: {
        // Dpage
        // Tpage
        // rowNum
      }
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
      bus.$emit('toload', true)
      this.$http.get(`/api/getBlogArray?page=${this.pageData.Dpage - 1}`).then((data) => {
        bus.$emit('toload', false)
        console.log(data.body.data)
        this.pageData = data.body.pageData
        this.blogArray = data.body.data
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
      bus.$emit('toload', true)
      this.$http.get(`/api/getBlogArray?page=${this.pageData.Dpage + 1}`).then((data) => {
        bus.$emit('toload', false)
        console.log(data.body.data)
        this.pageData = data.body.pageData
        this.blogArray = data.body.data
      })
    },
    pageChange () {
      bus.$emit('toload', true)
      this.$http.get(`/api/getBlogArray?page=${this.$refs.page.internalCurrentPage}`).then((data) => {
        console.log(data.body)
        bus.$emit('toload', false)
        this.pageData = data.body.pageData
        this.blogArray = data.body.data
      })
    },
    getBlogArray () {
      const me = this
      const cateId = this.$route.query.cateId || 0
      if (!me.scroll) {
        me.scroll = new BScroller('#Vmain', {
          scrollY: true,
          click: true
        })
      }
      bus.$emit('toload', true)
      this.$http.get(`/api/getBlogArray?page=1&cateId=${cateId}`).then((data) => {
        console.log(data.body)
        this.pageData = data.body.pageData
        this.blogArray = data.body.data
        this.$nextTick(() => {
          me.scroll.refresh()
          me.scroll.scrollTo(0, 0, 2000)
          bus.$emit('toload', false)
        })
      })
    }
  },
  mounted () {
    const me = this
    this.$nextTick(() => {
      console.log(123)
      me.getBlogArray()
    })
  },
  watch: {
    $route: {
      deep: true,
      handler: 'getBlogArray'
    }
  }
}
</script>
