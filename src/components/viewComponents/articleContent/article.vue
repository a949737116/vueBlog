<template>
  <div id='essay'>
    <div style='background-color:#fff' class='outermost'>
      <!-- 标题 -->
      <h1>《旗帜的传说3》游民评测8.5分 魔幻史诗的终章</h1>
      <!-- 文章信息 -->
      <div class='essayMessage'>
            <div>
              <i class="icon iconfont icon-login_user"></i><span id='writer'>站长</span>
            </div>
            <div>
              <i class="el-icon-info type"></i><span>WEB前端</span>
            </div>
            <div>
              <i class="el-icon-time time"></i><span>2017-12-26 08:49:49</span>
            </div>
            <div>
              <i class="icon-wenzhang1 icon iconfont"></i><span>50</span>
            </div>
            <div>
              <i class="icon-like icon iconfont"></i><span>2</span>
            </div>
      </div>
      <!-- 内容 -->
      <div class='essayContent'>
        我想就算是最为严苛的SLG粉丝，也不得不折服于《旗帜的传说》那极具特色的手绘风格，还有它独具匠心的战棋设定。不仅是在独立游戏的类别里，哪怕是和《火焰纹章》或者《XCOM》这种大制作的3A SLG相比，《旗帜的传说》都有一种小而美的独特气质，吸引着你不断地去了解它。

        暌违两年，我们终于等来了《旗帜的传说3》。这一次，发生在遥远大陆上的魔幻史诗将会迎来终章。而你也要用一次次的战斗，还有一次次的选择，来决定这片大陆上的子民，终将会走向怎样的结局。
        至暗时刻

        标题里的3，严格来说并不是指“第三代”，而是像《指环王》电影那样，指的是“第三章”。它的剧情紧接着前两作的故事，你不仅可以导入前作的存档，延续上一作结局时队伍的状态，甚至连故事章节的序号都是一脉相承的。所以，如果你没有玩过前两作，那就可能会对之前的发生的事还有世界观的设定感到困惑。估计也是考虑到了这一点，《旗帜的传说3》内置了一个前情提要的功能，减轻了新玩家入坑的难度。
      </div>
      <!-- 评论区 -->
    </div>
    <div style='margin-top:50px'>
        <pinglun></pinglun>
    </div>
  </div>
</template>
<script>
import pinglun from '@components/commonComponents/pinglun/pinglun'
export default{
  name: 'essay',
  components: {
    pinglun
  }
}
</script>
<style scoped lang='less'>
#essay {
  .outermost {
    font-family: Microsoft Yahei;
    padding: 20px 35px;
    h1 {
        margin: 0 0 12px;
        font-size: 30px;
        word-wrap: break-word;
        color: #000;
        font-weight: 400;
    }
    .essayMessage {
      margin-bottom: 40px;
      div {
        display: inline-block;
        margin-right: 10px;
        .icon-login_user {
          color: indianred
        }
        .type {
          color:#97a7e3;
        }
        .icon-wenzhang1{
          color: #b0b01f
        }
        .icon-like {
          color: orange
        }
        i {
          margin-right: 5px
        }
        span {
          font-size: 12px;
          color: #808080
        }
        #writer {
          color: #000;
          font-weight: 500;
          font-size: 14px
        }
      }
    }
    .essayContent {
      font-size: 16px;
      line-height: 1.65;
      word-wrap: break-word;
    }
  }
}
</style>
