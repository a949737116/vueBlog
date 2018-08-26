<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#3a8ee63d"
      text-color="#fff"
      router=true
      active-text-color="#ffd04b">
      <el-menu-item index="home">首页</el-menu-item>
      <el-submenu>
        <template slot="title">博文分类</template>
          <el-menu-item v-for='u in cate' :disabled='u.show ? false : true' :key='u.name'>
            {{u.name}}
          </el-menu-item>
      </el-submenu>
      <el-menu-item index="3" v-if='isAdmin'>管理面板</el-menu-item>
      <el-menu-item index="3" disabled v-else >管理面板</el-menu-item>
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
