<template>
  <div id='footer'>
     <el-dialog
      :visible.sync="centerDialogVisible"
      width="20%"
      center
      @close='handleClose'
    >
      <tablink slot='title' :aName='aName'></tablink>
    </el-dialog>
    <div class='cpright'>
      © Copyright - ZengHao
    </div>
    <div class='cplink'>
      <el-button type="text" @click="openLink('wx')" style='padding:0'>
        <span class='icon iconfont icon-weixin wx'></span>
      </el-button>
      <el-button type="text" @click="openLink('qq')" style='padding:0'>
        <span class='icon iconfont icon-qq-copy qq'></span>
      </el-button>
      <el-button type="text" @click="openLink('git')" style='padding:0'>
        <span class="icon iconfont icon-github git"></span>
      </el-button>
      <el-popover
        placement="top"
        trigger="click"
        >
        <a href='https://weibo.com/u/2069221835' target='_blank'>https://weibo.com/u/2069221835</a>
        <el-button slot="reference" style='background-color:inherit;border: none;padding:0;margin-left:0'><span class='icon iconfont icon-weibo wb'></span></el-button>
      </el-popover>
    </div>
  </div>
</template>
<script>
import tablink from '@components/viewComponents/tabLink/tablink'
export default{
  name: 'vfooter',
  data () {
    return {
      centerDialogVisible: false,
      aName: 'wx'
    }
  },
  components: {
    tablink
  },
  methods: {
    openLink (name) {
      this.centerDialogVisible = true
      this.aName = name
    },
    handleClose () {
      this.aName = ''
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
      padding-top: 9px;
      float: left;
      font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
    }
    .cplink{
      float: right;
      span{
        margin-left: 15px;
        font-size: 30px;
      }
      .git{
        color: #fff;
      }
      .wx{
        color: springgreen
      }
      .qq {
        font-size: 35px;
        color: #66b1ff;
      }
      .wb{
        font-size: 35px;
        color: red;
      }
    }
    &:after{
      clear: both;
      content: '.';
      display:none;
    }
  }
</style>
