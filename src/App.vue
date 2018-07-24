<template>
  <div id="app">
    <el-container>
      <el-header>
        <!-- 导航栏 -->
         <tabBar></tabBar>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 左侧个人栏 -->
          <privateL></privateL>
        </el-aside>
        <el-main>
          <!-- 路由控制部分 -->
           <router-view></router-view>
        </el-main>
        <el-aside width="200px">
          <!-- 右侧登录以及友链 -->
          <friendShip></friendShip>
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
import tabBar from '@components/commonComponents/tabBar/tabBar'
import privateL from '@components/commonComponents/individual/private'
import friendShip from '@components/commonComponents/friendShip/friendShip'
import vfooter from '@components/commonComponents/footer/footer'
export default {
  name: 'App',
  data () {
    return {
      radio: '1'
    }
  },
  components: {
    tabBar,
    privateL,
    friendShip,
    vfooter
  }
}
</script>

<style lang='less'>
@import 'common/css/footer.less';
/* 变量区 */
@backgroundImg-src : './assets/background1.png';
/* CSS区 */
body {
  position: relative;
  background-image: url(@backgroundImg-src);
  #app{
    .el-container{
      .el-header, .el-footer {
      background-color: #fff;
      color: #333;
      text-align: center;
      line-height: 60px;
      padding: 0;
    }
    &>.el-container{
      width: 1024px;
      margin: 0 auto;
      .el-aside {
        background-color: #fff;
        color: #333;
        text-align: center;
        line-height: 200px;
      }
      .el-main {
        background-color: #fff;
        color: #333;
        text-align: center;
        line-height: 160px;
      }
    }
  }
  }
}
</style>
