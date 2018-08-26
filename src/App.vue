<template>
  <div id="app">
    <el-container>
      <el-header>
        <!-- 导航栏 -->
         <tabBar :cate='cateList' :isAdmin='isAdmin'></tabBar>
      </el-header>
      <el-container>
        <el-aside width="150px" style='overflow:hidden'>
            <leftTab :cate='cateList'></leftTab>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-aside width="250px">
            <loginBoard :class='rightShowList.lbShow ? "" : "hidden"' :wd="lg01"></loginBoard>
            <lreg :class='rightShowList.lrShow ? "" : "hidden"' @lrCipher="receiveData"></lreg>
            <pinfo :class='rightShowList.piShow ? "" : "hidden"' style='margin-top:20px' :wd="lg02"></pinfo>
            <notice :class='rightShowList.ntShow ? "" : "hidden"' style='margin-top:20px'></notice>
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
      isAdmin: false,
      cateList: [],
      radio: '1',
      rightShowList: {
        // loginBoard
        lbShow: false,
        // lreg
        lrShow: true,
        // pinfo
        piShow: true,
        // notice
        ntShow: true
      }
    }
  },
  computed: {
    lg01 () {
      let data = this.$store.state.loginInfo
      let info = {}
      info = {
        name: data.name,
        isAdmin: data.isAdmin
      }
      return info
    },
    lg02 () {
      let data = this.$store.state.loginInfo
      let info = {}
      if (data.sex) {
        data.sexCN = data.sex === 'm' ? '男' : '女'
      }
      info = {
        name: data.name,
        sex: data.sexCN,
        imgUrl: data.icon_image
      }
      return info
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
  },
  created () {
    let me = this
    this.$http.get('/api/view_ctae').then((data) => {
      console.log(data)
      me.isAdmin = data.body.isAdmin
      me.cateList = data.body.classList
    })
  },
  methods: {
    receiveData (data) {
      this.rightShowList.lrShow = false
      this.rightShowList.lbShow = true
    }
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
