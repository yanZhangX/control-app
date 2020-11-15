<!--
 * @Author: xiangty
 * @Date: 2020-11-03 23:02:11
 * @LastEditTime: 2020-11-15 21:55:52
 * @LastEditors: Please set LastEditors
 * @Description: 表单展示页
 * @FilePath: \control-app\src\views\formDetail\index.vue
-->
<template>
  <div class="form-detail" formDetail>
    <van-nav-bar title="表单详情" left-text="返回" left-arrow fixed @click-left="onClickLeft">
      <template #right>
        <van-button type="primary" size="mini" color="#1989fa" @click="toDetail">填写表单</van-button>
      </template>
    </van-nav-bar>
    <van-cell-group class="cell-group">
      <van-cell title="模板名称" :value="templateData.templateName" />
      <van-cell title="创建人" :value="templateData.createR" />
      <van-cell title="创建时间" :value="templateData.createTime" />
    </van-cell-group>
  </div>
</template>

<script>
import { NavBar, Button, CellGroup, Cell, List } from 'vant'
import { getTemplate } from '@/api/form'
export default {
  name: 'formDetail',
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [List.name]: List
  },
  data() {
    return {
      templateData: {},
      templateId: null
    }
  },
  created() {
    this.templateId = this.$route.query.templateId
    this.queryTemplate()
  },
  methods: {
    queryTemplate() {
      const { templateId } = this
      getTemplate({ templateId }).then((res) => {
        this.templateData = res.data
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    toDetail() {
      const { templateId, templateData, $route } = this
      this.$router.push({ path: '/formInput', query: { templateId, hid: templateData.hid, path: $route.path } })
    }
  }
}
</script>

<style lang="scss">
.form-detail[formDetail] {
  .cell-group {
    padding-top: 50px;
  }
  .custom-select {
    overflow: visible;
    align-items: center;
  }
  .custom-input .van-field__control--custom {
    justify-content: flex-end;
  }
  .multiselect__option--selected.multiselect__option--highlight {
    background-color: #1989fa;
  }
}
</style>
