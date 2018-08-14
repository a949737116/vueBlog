<template>
  <el-card
  shadow="hover"
  :body-style= "{padding:'5px 15px'}"
  id="notice"
  >
  <div slot='header' class='notice_header'>
    <i class='icon_image icon_promotion'></i>
    <span>公告栏</span>
  </div>
    欢迎您来到我的个人博客，注册并登陆即能获得完整的博客体验。再次感谢您的莅临。
  </el-card>
</template>
<script>
export default {
  name: 'notice'
}
</script>
<style lang='less'>
#notice {
  font-size: 13px;
  text-align: left;
  line-height: 20px;
  text-indent: 5px;
  .notice_header {
    i {
      margin-right: 2px
    }
    text-align: left;
    font-size: 14px;
    font-weight: 700;
  }
  .icon_image {
    background-size: 23px 23px;
    width: 23px;
    height: 23px;
    vertical-align: middle;
    display: inline-block;
    background-repeat: no-repeat;
  }
}
</style>
