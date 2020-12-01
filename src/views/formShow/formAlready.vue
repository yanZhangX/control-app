<!--
 * @Author: xianvgty
 * @Date: 2020-11-14 11:48:22
 * @LastEditTime: 2020-11-30 00:07:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\views\formShow\formAready.vue
-->
<template>
  <div class="form-already">
    <van-nav-bar title="已填写列表" fixed />
    <van-skeleton :row="20" :loading="loading" />
    <van-list class="main-body" v-if="formList.length > 0" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryListUserFormData">
      <template v-for="(item, index) in formList">
        <van-cell :value="item.createTime" :title="item.templateName" is-link @click.native="toDetail(item.templateId, item.hid)" :key="index">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #label>
            <van-row>
              <van-col span="10">创建人：</van-col>
              <van-col span="14">{{ item.submitR }}</van-col>
            </van-row>
            <!-- <van-row>
              <van-col span="10">创建时间：</van-col>
              <van-col span="14">{{ item.createTime }}</van-col>
            </van-row> -->
            <van-row>
              <van-col span="14">是否允许修改：</van-col>
              <van-col span="8">{{ item.moidfy === 0 ? '否' : '是' }}</van-col>
            </van-row>
          </template>
        </van-cell>
      </template>
    </van-list>
    <van-empty v-if="formList.length === 0 && pageTotal === 0" description="暂无数据" />
  </div>
</template>

<script>
import { formListAready } from '@/api/form.js'
import { NavBar, Cell, CellGroup, Col, Row, Tag, Empty, List, Skeleton } from 'vant'
export default {
  name: 'formAready',
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Col.name]: Col,
    [Row.name]: Row,
    [Tag.name]: Tag,
    [Empty.name]: Empty,
    [List.name]: List,
    [Skeleton.name]: Skeleton
  },
  data() {
    return {
      formList: [],
      query: {
        currentPage: 1,
        pageSize: 10
      },
      finished: false,
      loading: false,
      pageTotal: undefined
    }
  },
  methods: {
    toDetail(templateId, hid) {
      const { path } = this.$route
      this.$router.push({ path: '/formInput', query: { templateId, hid, path } })
    },
    queryListUserFormData() {
      const { query } = this
      this.loading = true
      formListAready(query)
        .then((res) => {
          const { records = [], total } = res.data
          this.formList.push(...records)
          this.loading = false
          this.pageTotal = total
          if (this.formList.length === total) {
            this.finished = true
          } else {
            query.currentPage++
          }
        })
        .catch((code) => {
          if (code === 9999) {
            this.loading = false
            this.pageTotal = 0
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
