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
            <router-link to='/myBasicInfo' v-if='wd.name'>{{wd.name}}</router-link>
            <span v-else>？？？</span>
            <el-tooltip :content="`会员等级${wd.level}`" placement='top' effect="light"  v-if='wd.name'>
              <i :class='`icon_image icon_level lv${wd.level}`'></i>
            </el-tooltip>
            <el-tooltip content="管理员" placement='top' effect="light" v-if='wd.isAdmin'>
              <i class='icon_image icon_admin'></i>
            </el-tooltip>
            <el-tooltip v-if='wd.hornor.length>0'  v-for='(u, i) in wd.hornor' v-bind:key='i' :content="title[u]" placement='top' effect="light">
              <i :class='`icon_image icon_${u}`'></i>
            </el-tooltip>
          </p>
          <div v-if='wd.name && wd.level<3' class='levelRow'>
            <el-tooltip :content='`当前${wd.level}级`' placement="bottom">
              <i :class='`icon_image icon_level lv${wd.level}`'></i>
            </el-tooltip>
            <i class='icon_image el-icon-caret-right' style='vertical-align:text-top'></i>
            <el-tooltip :content='`下一等级${wd.level + 1}`' placement="bottom">
              <i :class='`icon_image icon_level lv${wd.level + 1}`'></i>
            </el-tooltip>
          </div>
          <div class='levelRow' v-else-if='wd.name'>
            <img src="@assets/maxlevel.png" alt="">
          </div>
          <div class='position'>
            <i class='icon-position icon iconfont' style='color:#6666bd;vertical-align: middle;'></i>
            <span>中国 · {{wd.city || '??'}}</span>
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
  },
  data () {
    return {
      title: {
        'new': '新注册的用户'
      }
    }
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
    .levelRow {
      font-size: 12px;
      padding-top: 10px;
      text-align: center;
    }
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
