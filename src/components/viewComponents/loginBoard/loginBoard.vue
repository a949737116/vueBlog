<template>
  <div id='loginBoard'>
    <p>
      <span class='gongli'>公历</span>
      <span style='margin-left:5px'>2018年 08月 14日</span>
    </p>
    <p>
      星期二
    </p>
    <p>
      <span class='cg cgAnimation'>欢迎，</span>
      <a href=''>我的98K贼6</a>
    </p>
    <div class='login_do'>
      <div>后台管理</div>
      <div>退出登录</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loginBoard'
}
</script>
<style lang='less'>
  #loginBoard {
    margin-top: 20px;
    background-image:url('../../../assets/colorBg.png');
    width: 250px;
    height: 156px;
    position: relative;
    box-sizing: border-box;
    padding: 20px 10px;
    background-repeat: none;
    p {
      font-size: 13px;
      margin-bottom: 8px;
      .gongli {
        font-weight: 700;
        font-size: 20px;
      }
      .cg {
        font-family: cursive;
        font-size: 18px;
        color: #FEB692;
        font-weight: 700;
      }
    }
    .login_do {
      padding: 5px 10px;
      &>div {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        font-family: cursive;
        color: #a91c71  ;
        border: 1px solid #ccc
      }
      &>div:hover {
        cursor: pointer;
        background-color: #cccccc;
        color:#fff;
      }
    }
  }
  @keyframes cgColor {
    0% {
      color: #fedb71
    }
    20% {
      color: #fff687
    }
    40% {
      color: #f6416c
    }
    50% {
      color: #ABDCFF
    }
    70% {
      color: #0396ff
    }
    80% {
      color: #81fbb8
    }
    100% {
      color: #28c76f
    }
  }
  @-o-keyframes cgColor {
    0% {
      color: #fedb71
    }
    20% {
      color: #fff687
    }
    40% {
      color: #f6416c
    }
    50% {
      color: #ABDCFF
    }
    70% {
      color: #0396ff
    }
    80% {
      color: #81fbb8
    }
    100% {
      color: #28c76f
    }
  }
  @-moz-keyframes cgColor {
    0% {
      color: #fedb71
    }
    20% {
      color: #fff687
    }
    40% {
      color: #f6416c
    }
    50% {
      color: #ABDCFF
    }
    70% {
      color: #0396ff
    }
    80% {
      color: #81fbb8
    }
    100% {
      color: #28c76f
    }
  }
  @-webkit-keyframes cgColor {
    0% {
      color: #fedb71
    }
    20% {
      color: #fff687
    }
    40% {
      color: #f6416c
    }
    50% {
      color: #ABDCFF
    }
    70% {
      color: #0396ff
    }
    80% {
      color: #81fbb8
    }
    100% {
      color: #28c76f
    }
  }
  .cgAnimation {
    animation: cgColor 7s linear infinite alternate;
    -webkit-animation: cgColor 7s linear infinite alternate;
    -moz-animation: cgColor 7s linear infinite alternate;
    -o-animation: cgColor 7s linear infinite alternate;
  }
</style>
