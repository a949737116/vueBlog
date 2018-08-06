import Vue from 'vue'
import Router from 'vue-router'
import contentHome from '@components/viewComponents/contentHome/contentHome'
import essay from '@components/viewComponents/articleContent/article'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      name: 'home',
      component: essay
    },
    {
      path: '/2',
      name: 'home',
      component: contentHome
    }
  ]
})
