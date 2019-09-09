<template>
  <div
    id="app">
    <!-- <div class='cover loader' v-if='imgload'>
      <span>
        <img src="./assets/loading.gif" >
      </span>
    </div>
    <div class='cover' v-if='!onceVisit'>
      <div class='scrollGuider'>
        <img src="./assets/lesson.gif" width='800' height='593'>
      </div>
      <div class='mouse'>
        <img src="./assets/mouse.png" id='mouse' width='200' height='200'>
      </div>
      <div class='coverClose'>
        <span>关闭教程→</span>
        <i class='el-icon-circle-close-outline' @click='addOnceVisit'></i>
      </div>
    </div> -->
    <el-container style='height:100%'>
      <!-- 导航栏 -->
      <el-header class='hidden-xs-only'>
         <tabBar :cate='cateList' :isAdmin='isAdmin' style='height:60px'></tabBar>
      </el-header>
      <div class='mobile-tarbar hidden-sm-and-up'>
        <mtbar :options='cateList' :isAdmin='isAdmin'></mtbar>
      </div>
      <p class='mobile-title hidden-sm-and-up'>
        欢迎来到我的博客
      </p>
      <el-main class='mainContentBox' >
        <div class='mainContent' ref='mobileContent'>
          <el-row>
            <el-col :xs="0" :md="5">
              1
            </el-col>
            <el-col :xs="24"  :md="14">
              <router-view></router-view>
            </el-col>
            <el-col :xs="0"  :md="5">
              3
            </el-col>
          </el-row>
        </div>
      </el-main>
      <!-- <el-container class='containerFix'>
        <el-aside width="150px" style='overflow:hidden'>
          <div class='scroller'>
            <leftTab :cate='cateList'></leftTab>
          </div>
        </el-aside>
        <el-main id='Vmain'>
          <router-view></router-view>
        </el-main>
        <el-aside width="250px">
          <div class='scroller'>
            <div>
               <loginBoard :class='rightShowList.lbShow ? "" : "hidden"' :wd="lg01" @backToCriper='clearData'></loginBoard>
              <lreg :class='rightShowList.lrShow ? "" : "hidden"' @lrCipher="receiveData"></lreg>
              <pinfo :class='rightShowList.piShow ? "" : "hidden"' style='margin-top:20px' :wd="lg02"></pinfo>
              <notice :class='rightShowList.ntShow ? "" : "hidden"' style='margin:20px 0px'></notice>
            </div>
          </div>
        </el-aside>
      </el-container> -->
    </el-container>
     <!-- <el-footer id='efooter' style='background-color: #000;height:56px'>
        <vfooter></vfooter>
      </el-footer> -->
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
import bus from './eventBus/index.js'
import mtbar from '@components/mobileComponents/tarbar'
const provinceObject = {
  hebei: '河北省',
  liaoning: '辽宁省',
  heilongjiang: '黑龙江省',
  zhejiang: '浙江省',
  fujian: '福建省',
  shandong: '山东省',
  guangdong: '广东省',
  hubei: '湖北省',
  sichuang: '四川省',
  yunnan: '云南省',
  gangsu: '甘肃省',
  taiwang: '台湾省',
  shanxi: '山西省',
  jilin: '吉林省',
  jiangsu: '江苏省',
  anhui: '安徽省',
  jiangxi: '江西省',
  henan: '河南省',
  hunan: '湖南省',
  hainan: '海南省',
  guizhou: '贵州省',
  xiaxi: '陕西省',
  qinghai: '青海省',
  zizhiqu: '中国自治区'
}
export default {
  name: 'App',
  data () {
    return {
      onceVisit: false,
      imgload: true,
      ifLoad: true,
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
        imgUrl: data.icon_image,
        city: provinceObject[data.city],
        level: data.level,
        hornor: data.hornor,
        isAdmin: data.isAdmin
      }
      return info
    },
    isAdmin () {
      return this.$store.state.loginInfo.isAdmin
    },
    platformType (){
      var is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|ipad|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
      if (is_mobi) {
        // 手机
        return 1
      }else{
        // 电脑
        return 2
      }
    }
  },
  components: {
    lreg,
    tabBar,
    leftTab,
    vfooter,
    pinfo,
    notice,
    loginBoard,
    mtbar
  },
  created () {
    let me = this
    if (window.localStorage.getItem('lzhBlogOnceVisit')) {
      this.onceVisit = true
    }
    this.$nextTick(() => {
      this.$http.get('/api/view_ctae').then((data) => {
        console.log(data)
        me.cateList = data.body.classList;
        var is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|ipad|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
        if (is_mobi) {
          // 手机
          console.log('手机')
          me.$refs.mobileContent.style.right = '0px'
        }else{
          // 电脑
          console.log('电脑')
        }
      })
    })
  },
  mounted () {
    const me = this
    bus.$on('toload', (value) => {
      me.ifLoad = value;
    })
    window.onload = function () {
      me.imgload = false
    }
  },
  methods: {
    receiveData (data) {
      this.rightShowList.lrShow = false
      this.rightShowList.lbShow = true
    },
    clearData () {
      this.rightShowList.lrShow = true
      this.rightShowList.lbShow = false
    },
    addOnceVisit () {
      this.onceVisit = true
      window.localStorage.setItem('lzhBlogOnceVisit', true)
    }
  }
}
</script>
<style lang='less'>
@import 'common/css/common.less';
@import 'common/css/fixForEle.less';
@import 'common/css/icon.less';
@import 'common/css/forEditor.less';
/* CSS区 */
body {
  height: 100%;
  position: relative;
  background-repeat: repeat;
  background-color: #000;
  #app{
    height: 100%;
    .cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(21,14,16,0.78);
      z-index:9;
      .scrollGuider {
        position: absolute;
        top: calc(50% - 296px);
        left: calc(48% - 400px);
      }
      .mouse {
        position: absolute;
        top: calc(50% - 100px);
        left: calc(50% - 100px);
      }
      .coverClose {
        position: absolute;
        top: 20px;
        right: 30px;
        span {
          font-size: 50px;
          color: #8a9eb0;
        }
        i {
          font-size: 50px;
          color: #83a5c9
        }
        i:hover{
          cursor: pointer;
        }
      }
    }
    .cover.loader {
      background-color: #000;
      z-index: 99;
      text-align: center;
      display: table;
      vertical-align: middle;
      span {
        display: table-cell;
        vertical-align: middle
      }
    }
    //  .cover.loader {
    //   background-color: #000;
    //   z-index: 99;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   span {
    //     vertical-align: middle
    //   }
    // }
    #efooter {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%
    }
    .containerFix {
      height: calc(100% - 60px);
    }
    .mobile-tarbar {
      position: absolute;
      top: 30px;
      right: 10px;
    }
    .mobile-title {
      margin-top: 30px;
      font-size: 18px;
      height: 50px;
      line-height: 50px;
      text-indent: 20px;
      color: #fff;
      font-weight: bolder;
    }
    .el-container{
      // width: 1224px;
      margin: 0 auto;
      .el-aside {
        width: 280px;
        overflow: hidden;
        color: #333;
        text-align: center;
        .scroller {
          height: 100%;
          width: 300px;
          overflow-y: scroll;
          &>div {
            width: 250px;
            position: relative;
          }
        }
      }
      #Vmain {
        overflow: hidden;
        padding-top: 0px!important;
        padding-bottom: 56px;
      }
      .el-header, .el-footer {
        color: #333;
        text-align: center;
        line-height: 60px;
        padding: 0;
      }
    }
    .mainContentBox {
      width: 100%;
      position: relative;
      overflow: hidden;
      height: 100%;
      padding: 0px;
    }
    .mainContent {
      position: absolute;
      left: 0;
      top: 0;
      right: -17px;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      padding: 20px;
    }
  }
}
</style>
