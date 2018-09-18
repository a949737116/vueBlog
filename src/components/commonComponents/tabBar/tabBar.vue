<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#3a8ee63d"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <router-link to='/' style='font-szie:13px;text-decoration:none;color:inherit;width:100%;display:inline-block'>首页</router-link>
      </el-menu-item>
      <el-submenu index='2'>
        <template slot="title">博文分类</template>
          <el-menu-item v-for='(u, i) in cate' :index="'class' + i"  :disabled='u.show==="是" ? false : true' :key='u.name'>
            <router-link :to='`/?cateId=${u.classId}`' style='font-szie:13px;text-decoration:none;color:inherit;width:100%;display:inline-block'>{{u.name}}</router-link>
          </el-menu-item>
      </el-submenu>
      <el-menu-item index="3" v-if='isAdmin'><a href='/admin' target='blank' style='font-szie:13px;text-decoration:none;color:inherit;width:100%;display:inline-block'>管理面板</a></el-menu-item>
      <el-menu-item index="3" disabled v-else >
        管理面板
      </el-menu-item>
      <el-menu-item index="4">个人网站</el-menu-item>
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
