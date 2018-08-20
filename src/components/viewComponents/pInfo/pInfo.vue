<template>
  <div class='meCard'>
     <el-card shadow='always' style='border:none' :body-style="{padding: '0px' }">
        <!-- 头像 -->
        <div class='touxiang'>
          <img :src="wd.imgUrl?wd.imgUrl:'/data/unknown.png'"  alt="">
        </div>
        <!-- 简单资料 -->
        <div class='ziliao'>
          <p>
            <a href="">
              <span>{{wd.name || '？？？'}}</span>
            </a>
            <el-tooltip content="站主" placement='top' effect="light">
              <i class='icon_head icon_image'></i>
            </el-tooltip>
            <el-tooltip content="Lv:999" placement='top' effect="light">
              <i class='icon_max icon_image'></i>
            </el-tooltip>
          </p>
          <div class='position'>
            <i class='icon-position icon iconfont' style='color:#6666bd;vertical-align: middle;'></i>
            <span>中国 · ？？</span>
          </div>
          <div class='otherInfo'>
            <i class='icon_image' :class='wd.sex==="女"?"icon_woman":"icon_man"'></i>
            <span>{{wd.sex || "?" }}</span>
            <i class='icon-wenzhang1 icon iconfont'></i>
            <span>？？篇</span>
          </div>
        </div>
      </el-card>
  </div>
</template>
<script>
export default{
  name: 'pInfo',
  props: {
    wd: Object
  }
}
</script>
<style scoped lang='less'>
.meCard{
  margin-bottom: 10px;
  .touxiang{
    width: 100%;
    padding: 10px 0;
    text-align: center;
    background-size: 100% 100%;
    background-image: url('../../../assets/touxiangbeijing.png');
    img {
      background-color: #fff;
      border-radius: 50%;
      height: 60px;
      width: 60px;
    }
  }
  .ziliao{
    padding: 10px;
    i {
      margin-left: 5px;
    }
    p {
      a {
        text-decoration: none;
        span{
          color: #000;
          font-weight: 800;
          vertical-align: top;
        }
      }
      a:hover {
        span {
          color: red
        }
      }
    }
    .position {
      margin: 10px 0;
      font-size: 13px;
    }
    .otherInfo {
      i {
        vertical-align: middle;
      }
      span {
        font-size: 13px;
      }
    }
  }
}
</style>
