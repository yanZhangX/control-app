<!--
 * @Author: your name
 * @Date: 2020-11-15 03:45:36
 * @LastEditTime: 2020-11-22 18:32:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\views\formShow\index.vue
-->
<template>
  <div class="form-show">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/formShow/formList" icon="todo-list">
        我的模板
      </van-tabbar-item>
      <van-tabbar-item replace to="/formShow/formAlready" icon="upgrade">
        已提交
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { NavBar, Tabbar, TabbarItem } from 'vant'
// import { FormList, FormAlready } from './index.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style></style>
