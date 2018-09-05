<template>
  <div class='leftTab'>
      <el-menu
      class='leftt'
      text-color="#fff"
      background-color="rgba(98, 109, 120, 0.24)"
      active-text-color="#fff">
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
          <span>我的生活</span>
        </div>
        <el-menu-item-group class='leftt'>
          <el-menu-item index="2-1">我的生活1</el-menu-item>
          <el-menu-item index="2-2">我的生活2</el-menu-item>
          <el-menu-item index="2-3">我的生活3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3" style='padding:none'>
        <div slot="title" class='tabTitle' style='text-align:left'>
          <i class="el-icon-location"></i>
          <span>其他</span>
        </div>
        <el-menu-item-group class='leftt'>
          <el-menu-item index="3-1">其他1</el-menu-item>
          <el-menu-item index="3-2">其他2</el-menu-item>
          <el-menu-item index="3-3">其他3 </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default{
  name: 'leftTab',
  props: {
    cate: Array
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
