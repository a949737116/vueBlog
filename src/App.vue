<template>
  <div id="app">
    <el-container style='height:100%'>
      <el-header>
        <!-- 导航栏 -->
         <tabBar :cate='cateList' :isAdmin='isAdmin'></tabBar>
      </el-header>
      <el-container style='padding-top:20px'>
        <el-aside width="150px" style='overflow:hidden'>
            <leftTab :cate='cateList'></leftTab>
        </el-aside>
        <el-main id='Vmain'>
            <router-view></router-view>
        </el-main>
        <el-aside width="250px" style='overflow:hidden'>
            <loginBoard :class='rightShowList.lbShow ? "" : "hidden"' :wd="lg01" @backToCriper='clearData'></loginBoard>
            <lreg :class='rightShowList.lrShow ? "" : "hidden"' @lrCipher="receiveData"></lreg>
            <pinfo :class='rightShowList.piShow ? "" : "hidden"' style='margin-top:20px' :wd="lg02"></pinfo>
            <notice :class='rightShowList.ntShow ? "" : "hidden"' style='margin-top:20px'></notice>
        </el-aside>
      </el-container>
    </el-container>
     <el-footer id='efooter' style='background-color: #000;height:56px'>
        <!-- 脚部 -->
        <vfooter></vfooter>
      </el-footer>
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
import BScroller from 'better-scroll'
import bus from './eventBus/index.js'
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
    this.$nextTick(() => {
      if (me.scroll) {
        me.scroll.refresh()
      } else {
        me.scroll = new BScroller('#Vmain', {
          scrollY: true,
          click: true
        })
      }
    })
  },
  mounted () {
    const me = this
    bus.$on('refrshDiv', () => {
      if (!me.scroll) {
        me.scroll = new BScroller('#Vmain', {
          scrollY: true,
          click: true
        })
      } else {
        me.scroll.refresh()
      }
    })
  },
  methods: {
    receiveData (data) {
      this.rightShowList.lrShow = false
      this.rightShowList.lbShow = true
    },
    clearData () {
      this.rightShowList.lrShow = true
      this.rightShowList.lbShow = false
    }
  }
}
</script>

<style lang='less'>
@import 'common/css/common.less';
@import 'common/css/fixForEle.less';
@import 'common/css/icon.less';
@import 'common/css/forEditor.less';
/* 变量区 */
@backgroundImg-src : './assets/background1.png';
/* CSS区 */
body {
  height: 100%;
  position: relative;
  background-image: url(@backgroundImg-src);
  #app{
    height: 100%;
    #efooter {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%
    }
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
      #Vmain {
        overflow: hidden;
        padding-top: 0px!important;
        padding-bottom: 56px;
      }
    }
  }
  }
}
</style>
