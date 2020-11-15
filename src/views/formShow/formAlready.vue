<!--
 * @Author: xianvgty
 * @Date: 2020-11-14 11:48:22
 * @LastEditTime: 2020-11-15 21:40:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\views\formShow\formAready.vue
-->
<template>
  <div class="form-already">
    <template v-for="(item, index) in formList">
      <van-cell value="详情" is-link @click.native="toDetail(item.templateId, item.hid)" :key="index">
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
import { formListAready } from '@/api/form.js'
import { Cell, CellGroup, Col, Row, Tag, Empty } from 'vant'
export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
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
    toDetail(templateId, hid) {
      const { path } = this.$route
      this.$router.push({ path: '/formInput', query: { templateId, hid, path } })
    },
    queryListUserFormData() {
      const { query } = this
      formListAready(query).then((res) => {
        const { records = [], total } = res.data
        this.formList.push(...records)
        this.loading = false
        if (this.formList.length === total) {
          this.finished = true
        }
      })
    }
  },
  created() {
    this.queryListUserFormData()
  }
}
</script>

<style></style>
