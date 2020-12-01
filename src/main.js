/*
 * @Author: xiangty
 * @Date: 2020-11-03 22:27:01
 * @LastEditTime: 2020-11-29 23:10:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\main.js
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // CSS重置的替代方法
import 'vue-multiselect/dist/vue-multiselect.min.css'
import './styles/index.scss'

import App from './App'
import router from './router'

import './icons' // icon

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
