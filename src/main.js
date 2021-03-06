// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUi from 'element-ui'
import vReasource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
/* 浏览器不同尺寸 */
import 'element-ui/lib/theme-chalk/display.css'

Vue.use(elementUi)
Vue.use(vReasource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
