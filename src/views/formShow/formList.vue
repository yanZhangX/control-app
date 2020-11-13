<!--
 * @Author: your name
 * @Date: 2020-11-04 23:42:03
 * @LastEditTime: 2020-11-12 22:45:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\views\formShow\formList.vue
-->
<template>
  <div class="form-list" formList>
    <van-nav-bar title="表单列表" />
    <template v-for="(item, index) in formList">
      <van-cell value="详情" is-link @click.native="toDetail(item.templateId)" :key="index">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <van-row>
            <van-col span="15">模板名称</van-col>
            <van-col span="8" offset="1">{{ item.templateName }}</van-col>
          </van-row>
          <van-row>
            <van-col span="15">创建人</van-col>
            <van-col span="8" offset="1">{{ item.submitR }}</van-col>
          </van-row>
          <van-row>
            <van-col span="15">创建时间</van-col>
            <van-col span="8" offset="1">{{ item.createTime }}</van-col>
          </van-row>
          <van-row>
            <van-col span="15">是否允许修改</van-col>
            <van-col span="8" offset="1">{{ item.moidfy === 0 ? '否' : '是' }}</van-col>
          </van-row>
        </template>
      </van-cell>
    </template>
    <van-empty v-if="formList.length === 0" description="暂无数据" />
  </div>
</template>

<script>
import { listUserFormData } from '@/api/form.js'
import { Cell, CellGroup, NavBar, Col, Row, Tag, Empty } from 'vant'
export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Col.name]: Col,
    [Row.name]: Row,
    [Tag.name]: Tag,
    [Empty.name]: Empty
  },
  data() {
    return {
      formList: [],
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
      listUserFormData(query).then((res) => {
        const { records = [] } = res.data
        this.formList = records
      })
    }
  },
  created() {
    this.queryListUserFormData()
  }
}
</script>

<style></style>
