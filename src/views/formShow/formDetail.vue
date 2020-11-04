<!--
 * @Author: xiangty
 * @Date: 2020-11-03 23:02:11
 * @LastEditTime: 2020-11-04 23:23:20
 * @LastEditors: Please set LastEditors
 * @Description: 表单展示页
 * @FilePath: \control-app\src\views\formShow\index.vue
-->
<template>
  <div class="formShow" formShow>
    <van-nav-bar title="标题" left-text="返回" left-arrow fixed />
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" />
      <!-- 通过 pattern 进行正则校验 -->
      <van-field v-model="value1" name="pattern" placeholder="正则校验" :rules="[{ pattern, message: '请输入正确内容' }]" />
      <!-- 通过 validator 进行函数校验 -->
      <van-field v-model="value2" name="validator" placeholder="函数校验" :rules="[{ validator, message: '请输入正确内容' }]" />
      <!-- 通过 validator 进行异步函数校验 -->
      <van-field v-model="value3" name="asyncValidator" placeholder="异步函数校验" :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]" />
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
export default {
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
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
