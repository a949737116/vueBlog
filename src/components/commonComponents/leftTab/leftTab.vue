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
          <span style='font-size:15px'>{{u.className}}</span>
        </div>
        <el-menu-item-group class='leftt'>
          <el-menu-item :index='`${i}-${ii}`' v-for='(uu, ii) in cateBlog[i]' :key='ii'>
            <!-- blog?contentId=${uu._id} -->
            <router-link :to="`/blog?contentId=${uu._id}`"  style='font-szie:13px;text-decoration:none;color:#fff;width:100%;display:inline-block'>{{uu.blogTitle.length>5?uu.blogTitle.substring(0,7) + '..' : uu.blogTitle}}</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
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
      cate: []
    }
  },
  created () {
    bus.$emit('toload', true)
    this.$http.get('/api/cateBlog').then((data) => {
      bus.$emit('toload', false)
      console.log(data)
      if (data.body.code === 0) {
        this.cateBlog = data.body.cateBlog
        this.cate = data.body.cate
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
