<template>
  <div id='footer'>
     <el-dialog
      :visible.sync="centerDialogVisible"
      width="20%"
      center>
      <tablink slot='title'></tablink>
    </el-dialog>
    <div class='cpright'>
      © Copyright - ZengHao
    </div>
    <div class='cplink'>
      <el-button type="text" @click="openLink">
        <span class='icon iconfont icon-weixin wx'></span>
      </el-button>
      <el-button type="text" @click="openLink">
        <span class='icon iconfont icon-qq-copy qq'></span>
      </el-button>
      <el-button type="text" @click="openLink">
        <span class='icon iconfont icon-weibo wb'></span>
      </el-button>
    </div>
  </div>
</template>
<script>
import tablink from '@components/viewComponents/tabLink/tablink'
export default{
  name: 'vfooter',
  data () {
    return {
      centerDialogVisible: false
    }
  },
  components: {
    tablink
  },
  methods: {
    openLink () {
      this.centerDialogVisible = true
    }
  }
}
</script>
<style scoped lang='less'>
  #footer{
    width: 1024px;
    margin: 0 auto;
    color: #fff;
    padding: 20px 0;
    .cpright{
      font-size: 14px;
      float: left;
      font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
    }
    .cplink{
      float: right;
      span{
        margin-left: 15px;
        font-size: 30px;
      }
      .wx{
        color: springgreen
      }
      .qq {
        font-size: 35px;
        color: powderblue;
      }
      .wb{
        font-size: 35px;
        color: red;
      }
    }
    &:after{
      clear: both;
      content: '.';
      display: hidden;
    }
  }
</style>
