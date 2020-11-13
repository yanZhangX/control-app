/*
 * @Author: xiangty
 * @Date: 2020-11-03 22:27:01
 * @LastEditTime: 2020-11-13 22:31:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\main.js
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // CSS重置的替代方法
import 'vue-multiselect/dist/vue-multiselect.min.css'

import App from './App'
import router from './router'

import './icons' // icon
import * as filters from './filters'

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
