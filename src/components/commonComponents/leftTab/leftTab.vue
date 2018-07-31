<template>
  <div class='leftTab'>
      <el-menu
      class='leftt'
      text-color="#fff"
      active-text-color="#000">
      <el-submenu index="1" style='padding:none'>
        <div slot="title" class='tabTitle' style='text-align:left'>
          <i class="el-icon-location"></i>
          <span>WEB前端</span>
        </div>
        <el-menu-item-group class='leftt'>
          <el-menu-item index="1-1">前端文章1</el-menu-item>
          <el-menu-item index="1-2">前端文章2</el-menu-item>
          <el-menu-item index="1-3">前端文章3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2" style='padding:none'>
        <div slot="title" class='tabTitle' style='text-align:left;'>
          <i class="el-icon-location"></i>
          <span>JAVA</span>
        </div>
        <el-menu-item-group class='leftt'>
          <el-menu-item index="2-1">JAVA文章1</el-menu-item>
          <el-menu-item index="2-2">JAVA文章2</el-menu-item>
          <el-menu-item index="2-3">JAVA文章3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3" style='padding:none'>
        <div slot="title" class='tabTitle' style='text-align:left'>
          <i class="el-icon-location"></i>
          <span>数据库</span>
        </div>
        <el-menu-item-group class='leftt'>
          <el-menu-item index="3-1">芒果DB</el-menu-item>
          <el-menu-item index="3-2">SQL</el-menu-item>
          <el-menu-item index="3-3">MSQL</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default{
  name: 'leftTab'
}
</script>
<style scoped lang='less'>
.leftTab{
  padding: 20px 0;
  .leftt{
    width: 150px;
    font-family: Microsoft Yahei;
    background-image: url('../../../assets/leftBg.png')!important;
    background-repeat: repeat;
  }
  .tab {
    .title {
      text-align: left!important;
    }
  }
}
</style>
