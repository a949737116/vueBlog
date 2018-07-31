import Vue from 'vue'
import Router from 'vue-router'
import contentHome from '@components/viewComponents/contentHome/contentHome'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      name: 'home',
      component: contentHome
    }
  ]
})
