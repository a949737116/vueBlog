<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-indexHeader"
      mode="horizontal"
      @select="handleSelect"
      background-color="#1B345A"
      active-text-color="#ffd04b"
      text-color="#fff"
    >
      <el-menu-item index="1">
        <router-link to='/' style='font-szie:13px;text-decoration:none;color:inherit;width:100%;display:inline-block'>首页</router-link>
      </el-menu-item>
      <el-submenu index='2' popper-class='el-menu-submenu'>
        <template slot="title">博文分类</template>
          <el-menu-item v-for='(u, i) in cate' :index="'class' + i"  v-if='u.show==="是" ? true : false' :key='u.name'>
            <router-link :to='`/?cateId=${u.classId}`' style='font-szie:13px;text-decoration:none;color:inherit;width:100%;display:inline-block'>{{u.name}}</router-link>
          </el-menu-item>
      </el-submenu>
      <el-menu-item index="3" v-if='isAdmin'><a href='/admin' target='blank' style='font-szie:13px;text-decoration:none;color:inherit;width:100%;display:inline-block'>管理面板</a></el-menu-item>
      <el-menu-item index="3" disabled v-else >
        管理面板
      </el-menu-item>
      <el-menu-item index="4">
        <a href='http://www.lizenghao.top' target='blank' style='font-szie:13px;text-decoration:none;color:inherit;width:100%;display:inline-block'>我的网站</a>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default{
  name: 'tabBar',
  props: {
    isAdmin: Boolean,
    cate: Array
  },
  data () {
    return {
      activeIndex: '2',
      activeIndex2: '2'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang='less'>
  /* 修复在搜狐、360等浏览器背景颜色失效 */
  // .el-menu-indexHeader {
  //     background-color: rgba(58, 142, 230, 0.24);
  //     li {
  //       background-color: rgba(58, 142, 230, 0.24);
  //     }
  // }
</style>
