<template>
  <div id="app">
    <el-container>
      <el-header>
        <!-- 导航栏 -->
         <tabBar></tabBar>
      </el-header>
      <el-container>
        <el-aside width="150px" style='overflow:hidden'>
          <!-- 左侧导航栏 -->
          <leftTab></leftTab>
        </el-aside>
        <el-main>
          <!-- 路由控制部分 -->
           <router-view></router-view>
        </el-main>
        <el-aside width="250px">
          <!-- 右侧登录以及友链 -->
          <loginBoard></loginBoard>
          <lreg></lreg>
          <pinfo style='margin-top:20px'></pinfo>
          <notice></notice>
        </el-aside>
      </el-container>
      <el-footer style='background-color: #000;height:auto'>
        <!-- 脚部 -->
        <vfooter></vfooter>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import lreg from '@components/viewComponents/logReg/logReg'
import tabBar from '@components/commonComponents/tabBar/tabBar'
import leftTab from '@components/commonComponents/leftTab/leftTab'
import vfooter from '@components/commonComponents/footer/footer'
import pinfo from '@components/viewComponents/pInfo/pInfo'
import notice from '@components/viewComponents/notice/notice'
import loginBoard from '@components/viewComponents/loginBoard/loginBoard'
export default {
  name: 'App',
  data () {
    return {
      radio: '1'
    }
  },
  components: {
    lreg,
    tabBar,
    leftTab,
    vfooter,
    pinfo,
    notice,
    loginBoard
  }
}
</script>

<style lang='less'>
@import 'common/css/common.less';
@import 'common/css/fixForEle.less';
@import 'common/css/icon.less';
/* 变量区 */
@backgroundImg-src : './assets/background1.png';
/* CSS区 */
body {
  position: relative;
  background-image: url(@backgroundImg-src);
  #app{
    .el-container{
      .el-header, .el-footer {
      color: #333;
      text-align: center;
      line-height: 60px;
      padding: 0;
    }
    &>.el-container{
      width: 1224px;
      margin: 0 auto;
      .el-aside {
        color: #333;
        text-align: center;
      }
      .el-main {
        color: #333;
        text-align: center;
      }
    }
  }
  }
}
</style>
