<template>
  <div id='pinglun'>
    <!-- 评论展示 -->
    <div>
      <!-- 单条 -->
      <div class='pl-item hidden'>
        <!-- 左边头像 -->
        <div class='pl-head'>
          <img src="@/assets/qqPic.jpg" class="image">
        </div>
        <!-- 右边信息 -->
        <div class='pl-substance'>
          <!-- 名字加图标 -->
          <div class='comment'>
            <span class='cm-name'>站长</span>
            <i class='icon_image icon_head'></i>
            <i class='icon_image icon_vip6'></i>
            <i class='icon_image icon_hot'></i>
            <span class='cm-name'>：</span>
            <span class='cn-comment'>
              上联：贾在哭，万在笑，小璐在挨炮 。下联： 宋在操，马在叫，宝宝在咆哮。 横批：指璐为马。谢谢校长Share，宵夜可以加几个鸡腿了。我那边基本都是Dota粉丝，一开始看这个问题的人很少。本来我还想厚着脸皮跟你说围观我一下，幸亏没……
            </span>
          </div>
          <!-- 回复时间 -->
          <p class='commit-date'>
            2017-3-29 19:38
          </p>
        </div>
      </div>
      <!-- 输入评论 -->
      <div class='pl-commit pl-item'>
        <div class='pl-head'>
          <img src="@/assets/qqPic.jpg" class="image">
        </div>
        <div class='yourCommit'>
          <el-input
            id="commentData"
            resize='none'
            type="textarea"
            :rows="2"
            placeholder="请发表您的精彩观点"
            v-model="textarea">
          </el-input>
          <el-button type="primary" style='float:right;margin-top:10px' size='small'>发表</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name: 'pinglun',
  data () {
    return {
      textarea: ''
    }
  }
}
</script>
<style scoped lang='less'>
#pinglun {
  background-color:#f2f2f5;
  .pl-item {
    padding: 20px 35px 20px;
    flex-direction: row;
    display: flex;
    .pl-head {
      .image {
        border-radius: 50%;
        box-shadow: 3px 3px 5px #888888;
      }
      padding-top: 5pxs;
      flex:50px 0 0;
      width: 50px;
      margin-right: 5px;
    }
    .pl-substance {
      box-shadow: 1px 1px 6px #903232;
      border-radius: 4px;
      padding: 5px 10px 10px;
      background-color: #fff;
      .comment {
        text-align: left;
        .cm-name {
          color: #712898;
          font-size: 14px;
          vertical-align: top;
          line-height: 23px;
          font-weight: 600;
        }
       .cn-comment {
         vertical-align: top;
          text-align: left;
          padding: 0 0 2px;
          line-height: 23px;
          font-size: 14px;
          font-family: Microsoft Yahei;
        }
      }
      .commit-date{
        text-align: right;
        font-size: 13px;
        color: #808080;
      }
    }
  }
  .pl-commit {
    padding: 20px 35px 20px;
    .yourCommit{
      flex: auto 1 1;
       #commentData {
        padding: 5px 2px 0px 6px;
        width: 100%;
        border-style: solid;
        border-width: 1px;
        font-size: 12px;
        word-wrap: break-word;
        line-height: 18px;
        overflow: hidden;
        outline: none;
        height: 53px;
        color: #808080;
        text-decoration: none;
        // 禁止拉伸
        resize:none;
      }
    }
  }
}
</style>
