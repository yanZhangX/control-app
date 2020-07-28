<template>
  <div class="login_headr">
    <img src="../../assets/background.jpg" alt />
    <div class="login_box">
      <div class="login_content">
        <div class="system_title">系统名称</div>
        <div class="system_line">|</div>
        <div class="system_name">
          <span>平台管理系统</span>
          <span>background login system</span>
        </div>
      </div>
      <div class="login_intermediate">
        <div class="login_container">
          <el-form ref="loginform" label-width="50px">
            <el-form-item label="账户">
              <el-input v-model="sccount" placeholder="请输入账户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="password" type="password" placeholder="请输入账户密码"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="goLogin">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      // form表单  账户
      sccount: '13219890986',
      //  密码
      password: '123456'
    }
  },
  methods: {
    goLogin() {
      // const data = {
      //   phone: this.sccount,
      //   password: this.password
      // }
      // this.$store.dispatch('user/login', data).then(() => {
      //   this.$router.push({ path: '/' })
      // })
      this.$router.push({ path: '/' })
    }
  }
}
</script>
<style lang="scss" scoped>
.login_headr {
  width: 100%;
  height: 100%;
  align-content: center;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 380px;
    height: 270px;
    transform: translate(-50%, -50%);
    .login_content {
      width: 340px;
      height: 30px;
      font-weight: bold;
      font-family: 'Microsoft Yahei';
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .system_title {
        font-size: 30px;
      }
      .system_line {
        font-size: 30px;
        color: #78c7a2;
      }
      .system_name {
        span {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        span:first-child {
          font-size: 17px;
        }
        span:last-child {
          font-size: 10px;
          text-transform: uppercase;
        }
      }
    }
    .login_intermediate {
      .login_container {
        width: 340px;
        height: 240px;
        box-sizing: border-box;
        margin: 0 auto;
        padding-top: 40px;
        .el-button {
          width: 100%;
        }
      }
    }
  }
}
</style>
