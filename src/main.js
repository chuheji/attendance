/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-05-15 23:56:51
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BaiduMap from 'vue-baidu-map'
import Vant from 'vant'
import 'vant/lib/index.css'
import request from './http'
import axios from 'axios'
import store from './vuex/index'
import { getCookie } from './common/cookie'
import './common/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(BaiduMap, {
  ak: 'jcUhhcIExVsZSthClfURrKniA2VlYmzO'
})
Vue.prototype.$request = request
axios.interceptors.request.use(function (config) {
  store.state.isLoading = true
  return config
})
axios.interceptors.response.use(function (response) {
  store.state.isLoading = false
  return response
})
Vue.prototype.$axios = axios
router.beforeEach((to, form, next) => {
  // 如果进入到的路由是登录页或者注册页面，则正常展示
  if (to.path === '/Login' || to.path === '/Register') {
    next()
  } else if (!(getCookie('nickname'))) {
    // 转入login登录页面，登录成功后会将info存入cookie
    next('/Login')
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
