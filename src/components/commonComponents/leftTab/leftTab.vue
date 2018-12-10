<template>
  <div class='leftTab'>
      <el-menu
      class='leftt'
      text-color="#fff"
      background-color="rgba(98, 109, 120, 0.24)"
      active-text-color="#fff">
      <el-submenu  :index='i.toString()' style='padding:none' v-for='(u,i) in cate' :key='i' v-if='u.isShow==="是"'>
        <div slot="title" class='tabTitle' style='text-align:left'>
          <i><img :src="u.cateIcon"  width=20 height=20 style='vertical-align:text-bottom'></i>
          <router-link :to='`/?cateId=${u._id}`' style='font-szie:13px;text-decoration:none;color:inherit;width:100%;display:inline-block'>{{u.className}}</router-link>
        </div>
        <el-menu-item-group class='leftt'>
          <el-menu-item :index='`${i}-${ii}`' v-for='(uu, ii) in cateBlog[i]' :key='ii'>
            <!-- blog?contentId=${uu._id} -->
            <el-tooltip :content="uu.blogTitle" placement="left">
              <router-link :to="`/blog?contentId=${uu._id}`"  style='font-szie:13px;text-decoration:none;color:#fff;width:100%;display:inline-block'>
                  {{uu.blogTitle.length>5?uu.blogTitle.substring(0,7) + '..' : uu.blogTitle}}
              </router-link>
            </el-tooltip>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :index='(cate.length + 1).toString()'>
        <div class='tabTitle' style='text-align:left;padding-left:5px'>
          <i><img src='../../../../upLoads/cateIcon/bug.png' width=20 height=20 style='vertical-align:text-bottom'></i>
          <router-link :to='`/blog?contentId=${bugId}`' style='text-decoration:none;color:#fff'>
              BUG反馈与更新
          </router-link>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import bus from '../../../eventBus/index.js'
export default{
  name: 'leftTab',
  data () {
    return {
      cateBlog: [],
      cate: [],
      bugId: ''
    }
  },
  created () {
    bus.$emit('toload', true)
    this.$http.get('/api/cateBlog').then((data) => {
      bus.$emit('toload', false)
      if (data.body.code === 0) {
        // 对日期进行反向排序
        this.cateBlog = data.body.cateBlog
        this.cateBlog.forEach(function (item) {
          console.log(item)
        })
        this.cate = data.body.cate
        this.bugId = data.body.bugId
      }
    })
  }
}
</script>
<style scoped lang='less'>
.leftTab{
  padding: 0px 0;
  .leftt{
    width: 150px;
    font-family: Microsoft Yahei;
    // background-image: url('../../../assets/leftBg.png')!important;
    // background-repeat: repeat;
  }
  .tab {
    .title {
      text-align: left!important;
    }
  }
}
</style>
