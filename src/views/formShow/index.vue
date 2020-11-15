<!--
 * @Author: your name
 * @Date: 2020-11-15 03:45:36
 * @LastEditTime: 2020-11-15 10:07:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\views\formShow\index.vue
-->
<template>
  <div class="form-show">
    <van-nav-bar :title="navTitle" />
    <van-tabs v-model="active" type="card" @click="changeTab">
      <van-tab title="模板列表">
        <form-list></form-list>
      </van-tab>
      <van-tab title="已编辑列表">
        <form-already></form-already>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tabs, Tab } from 'vant'
import { FormList, FormAlready } from './index.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    FormList,
    FormAlready
  },
  data() {
    return {
      navTitle: '模板列表',
      active: 1
    }
  },
  created() {
    const { mode } = this.$route.params
    if (mode) {
      this.active = Number(mode)
    }
  },
  methods: {
    changeTab(key, value) {
      this.navTitle = value
    }
  }
}
</script>

<style></style>
