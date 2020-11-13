<!--
 * @Author: xiangty
 * @Date: 2020-11-03 23:02:11
 * @LastEditTime: 2020-11-12 22:56:21
 * @LastEditors: Please set LastEditors
 * @Description: 表单展示页
 * @FilePath: \control-app\src\views\formShow\index.vue
-->
<template>
  <div class="formShow" formShow>
    <van-nav-bar title="标题" left-text="返回" left-arrow fixed @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" />
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { NavBar, Form, Button, Field } from 'vant'
import { listUserFormDetail, DropdownMenu, DropdownItem } from '@/api/form'
export default {
  name: 'formDetail',
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem
  },
  data() {
    return {
      username: '',
      password: '',
      templateId: null,
      value1: 0,
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ]
    }
  },
  created() {
    this.templateId = this.$route.query.templateId
    this.queryListUserFormDetail()
  },
  methods: {
    queryListUserFormDetail() {
      listUserFormDetail({ templateId: this.templateId }).then((res) => {})
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onSubmit(values) {
      console.log('submit', values)
    }
  }
}
</script>

<style lang="scss">
.formShow[formShow] {
  .van-form {
    padding-top: 50px;
  }
}
</style>
