let eventData = {
  startX: 0,
  endX: 0,
  startY: 0,
  endY: 0
};
var fnData = {};
const touchMonitor = {
  // 插件初始化和运行
  init: function (f1,f2) {
    if (window.hasOwnProperty('ontouchstart') && window.hasOwnProperty('ontouchend')) {
      /* 浏览器支持手势 */
      console.log('浏览器支持手势操作，插件初始化')
      /* 保存事件 */
      /* 注册事件 */
      window.addEventListener('touchstart', this.getTouchStart, false);
      window.addEventListener('touchend', this.getTouchEnd, false);
      fnData.left = f1;
      fnData.right = f2;
    } else {
      /* 浏览器不支持手势 */
      return;
    }
  },
  // 手指触摸屏幕
  getTouchStart: function(e) {
    e = e || window.event;
    eventData.startX = e.touches[0].pageX;
    eventData.startY = e.touches[0].pageY;
  },
  // 手指离开屏幕
  getTouchEnd: function(e) {
    e = e || window.event;
    eventData.endX = e.changedTouches[0].pageX;
    eventData.endY = e.changedTouches[0].pageY;
    touchMonitor.getTouchDirection();
  },
  // 获取手势方向
  getTouchDirection: function() {
    /* 计算滑动距离 */
    let touchDistance = Math.sqrt(Math.pow(eventData.endY - eventData.startY,2) + Math.pow(eventData.endX - eventData.startX,2));
    if (touchDistance <= 50) {
      /*滑动距离太小不予反馈*/
      return;
    }else{
      /*滑动距离足够，判断滑动方向*/
      const touchDeg = Math.atan2(eventData.endY - eventData.startY, eventData.endX - eventData.startX) *  180 / Math.PI;
      // 向右
      if (touchDeg >= -45 && touchDeg <= 45) {
        console.log('向右')
        fnData.right();
      // 向左
      }else if ((touchDeg >= 135 && touchDeg<= 180) || (touchDeg <= -135 && touchDeg >= -180)) {
        console.log('向左')
        fnData.left();
      // 向下
      }else if (touchDeg > 45 && touchDeg < 135  ) {
        console.log('向下')
      // 向上  
      }else if ((touchDeg < -45 && touchDeg > -135) ) {
        console.log('向上')
      }
      console.log(touchDeg);
    }
  }
}
export default touchMonitor
