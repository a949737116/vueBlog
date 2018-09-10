<template>
  <div>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="微信" name="wx">
        <el-card :body-style="{ padding: '0px' }">
          <img src="@/assets/weixin.jpg" class="image">
          <div class='join wxjoin'>
             扫描二维码，添加好友
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="QQ" name="qq">
        <div>
           <el-card :body-style="{ padding: '0px' }">
              <img src="@/assets/qq.jpg" class="image">
              <div class='joinQQ join'>
                  <img src="@/assets/qqPic.jpg" alt="">
                  <div>扫描二维码，加我qq</div>
              </div>
            </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="github" name="git">
        <img src="@/assets/github.png" class="image">
        <div class='join wxjoin'>
            <a href="https://github.com/a949737116" target='_Blank'> >>戳我跳转&lt;&lt; </a>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default{
  name: 'tablink',
  props: {
    aName: String
  },
  data () {
    return {
      activeName: this.aName
    }
  },
  watch: {
    aName: {
      handler: function () {
        this.activeName = this.aName
      }
    }
  }
}
</script>
<style scoped lang='less'>
  .joinQQ{
      img{
        padding-left: 5px;
        display: inline-block;
        float: left;
        margin: auto 0;
        width: 40px;
        height: 40px
      }
      div{
        height: 40px;
        line-height: 40px;
      }
  }
  .image{
    min-width: 200px;
    height: auto;
  }
  .join{
    margin-top: 20px
  }
  .wxjoin{
    height: 40px;
    line-height: 40px;
    a{
      text-decoration: none
    }
  }
</style>
