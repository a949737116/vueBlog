<style lang='less' scoped>
  .contentList {
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 10px;
    .contentRow {
      .contentTop {
        padding: 20px 20px 4px;
        display: flex;
        flex-direction: row;
        margin-bottom: 5px;
        .topLeft{
          flex: 50px 0 0;
          width: 50px;
          height: 50px;
        }
        .topRight{
          text-align: left;
          margin-left: 10px;
          .authorRow{
            margin-bottom: 7px;
            .name{
              vertical-align: top;
              font-size: 18px;
              color: #333;
              font-weight: 700;
            }
          }
          .artInfoRow{
            color: #808080;
            font-size: 13px;
            margin-bottom: 5px;
          }
          .title {
            color: #aa4343;
            font-family: STHeiti;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .articleRow{
            line-height: 15px;
            text-indent: 5px;
            font-size: 13px;
            color: #333;
            font-weight: 400;
            font-family: Microsoft Yahei
          }
        }
      }
      .contentBottom{
        border-top-width: 1px;
        border-top-style: solid;
        border-color: #f2f2f5;
        padding: 7px;
        font-size: 12px;
        vertical-align: top;
        color: #808080;
        div {
          border-color: #d9d9d9;
          border-left-width: 1px;
          border-left-style: solid;
          &:first-child {
            border: none
          }
        }
        span {
          margin-left: 2px;
        }
        i {
          display: inline-block
        }
      }
    }
  }
</style>
<template>
  <div class='contentList'>
    <div class='contentRow'>
      <div class='contentTop'>
        <div class='topLeft'>
          <!-- 头像栏 -->
          <img src="@/assets/qqPic.jpg" class="image">
        </div>
        <div class='topRight'>
          <!-- 作者信息 -->
          <div class='authorRow clear'>
            <span class='name'>本站作者</span>
            <i class='icon_image icon_head'></i>
            <i class='icon_image icon_vip6'></i>
            <i class='icon_image icon_hot'></i>
          </div>
          <!-- 作品信息 -->
          <div class='artInfoRow'>
            2018-7-30 10:51
          </div>
          <!-- 作品标题 -->
          <p class='title'>国际锐评：欧洲没胃口吃下被中国拒绝的美国大豆</p>
          <!-- 作品简介 -->
          <div class='articleRow'>
            7月25日，美国总统特朗普与到访的欧盟主席容克在会谈两个多小时后宣布，美欧双方同意在继续磋商阶段不再新增惩罚性关税。这给大西洋两岸一触即发的贸易摩擦升级态势按下了暂停键。
          </div>
        </div>
      </div>
      <div class='contentBottom'>
        <el-row>
          <el-col :span="8">
            <div>
              <i class='icon-wenzhang1 icon iconfont'></i>
              <span>全文</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <i class='icon-like icon iconfont'></i>
              <span>30</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <i class='icon-linedesign-01 icon iconfont'></i>
              <span>8</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name: 'contentHome',
  data () {
    return {
      blogArray: []
    }
  },
  created () {
    this.$https.get('/api/getBlogArray', (data) => {
      console.log(data)
    })
  }
}
</script>
