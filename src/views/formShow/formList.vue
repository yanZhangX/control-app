<!--
 * @Author: your name
 * @Date: 2020-11-04 23:42:03
 * @LastEditTime: 2020-11-11 23:04:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\views\formShow\formList.vue
-->
<template>
  <div class="form-list" formList>
    <van-nav-bar title="表单列表" />
    <!-- <template v-for="(item, index) in "></template> -->
    <van-cell value="详情" is-link @click.native="toDetail(8)">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <van-row>
          <van-col span="8">模板名称</van-col>
          <van-col span="8" offset="1">示例模板</van-col>
        </van-row>
        <van-row>
          <van-col span="12">是否允许修改</van-col>
          <van-col span="8" offset="1">禁止</van-col>
        </van-row>
      </template>
    </van-cell>
    <van-cell value="详情" is-link @click.native="toDetail(8)">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <van-row>
          <van-col span="8">模板名称</van-col>
          <van-col span="8" offset="1">示例模板</van-col>
        </van-row>
        <van-row>
          <van-col span="12">是否允许修改</van-col>
          <van-col span="8" offset="1">禁止</van-col>
        </van-row>
      </template>
    </van-cell>
    <van-cell value="详情" is-link @click.native="toDetail(8)">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <van-row>
          <van-col span="8">模板名称</van-col>
          <van-col span="8" offset="1">示例模板</van-col>
        </van-row>
        <van-row>
          <van-col span="12">是否允许修改</van-col>
          <van-col span="8" offset="1">允许</van-col>
        </van-row>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { listUserFormData } from '@/api/form.js'
import { Cell, CellGroup, NavBar, Col, Row, Tag } from 'vant'
export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Col.name]: Col,
    [Row.name]: Row,
    [Tag.name]: Tag
  },
  data() {
    return {
      query: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    toDetail(templateId) {
      this.$router.push({ path: '/formDetail', query: { templateId } })
    },
    queryListUserFormData() {
      const { query } = this
      listUserFormData(query).then((res) => {})
    }
  },
  created() {
    this.queryListUserFormData()
  }
}
</script>

<style></style>
