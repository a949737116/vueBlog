<template>
  <div id="app">
    <el-container style='height:100%'>
      <el-header>
        <!-- 导航栏 -->
         <tabBar :cate='cateList' :isAdmin='isAdmin'></tabBar>
      </el-header>
      <el-container style='padding:20px 0 56px 0'>
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
        imgUrl: data.icon_image,
        city: provinceObject[data.city],
        level: data.level,
        hornor: data.hornor,
        isAdmin: data.isAdmin
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
