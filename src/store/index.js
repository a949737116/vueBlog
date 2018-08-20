import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    loginInfo: {
      account: '',
      name: '',
      sex: '',
      job: '',
      icon_image: '',
      level: 0,
      isAdmin: false,
      isLogin: false,
      email: '',
      tel: '',
      adress: '',
      city: '',
      essayNum: 0
    }
  },
  mutations: {
    enterLogin (state, data) {
      if (data.Logined) {
        state.loginInfo.account = data.account
        state.loginInfo.name = data.name
        state.loginInfo.sex = data.sex
        state.loginInfo.job = data.job
        state.loginInfo.icon_image = data.icon_image
        state.loginInfo.level = data.level
        state.loginInfo.isAdmin = data.isAdmin
        state.loginInfo.isLogin = data.Logined
        state.loginInfo.email = data.email
        state.loginInfo.tel = data.tel
        state.loginInfo.adress = data.adress
        state.loginInfo.city = data.city
        state.loginInfo.essayNum = data.essayNum
      }
    }
  }
})
