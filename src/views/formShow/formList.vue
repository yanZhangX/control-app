<!--
 * @Author: your name
 * @Date: 2020-11-04 23:42:03
 * @LastEditTime: 2020-11-15 21:55:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\views\formShow\formList.vue
-->
<template>
  <div class="form-list" formList>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryListUserFormData">
      <template v-for="(item, index) in formList">
        <van-cell value="详情" is-link @click.native="toDetail(item)" :key="index">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <van-row>
              <van-col span="15">模板名称</van-col>
              <van-col span="8" offset="1">{{ item.templateName }}</van-col>
            </van-row>
            <van-row>
              <van-col span="15">创建人</van-col>
              <van-col span="8" offset="1">{{ item.createR }}</van-col>
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
    </van-list>
    <van-empty v-if="formList.length === 0" description="暂无数据" />
  </div>
</template>

<script>
import { getTemplateList } from '@/api/form.js'
import { Cell, CellGroup, Col, Row, Tag, Empty, List } from 'vant'
export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Col.name]: Col,
    [Row.name]: Row,
    [Tag.name]: Tag,
    [Empty.name]: Empty,
    [List.name]: List
  },
  data() {
    return {
      formList: [],
      query: {
        currentPage: 1,
        pageSize: 10
      },
      finished: false,
      loading: false
    }
  },
  methods: {
    toDetail({ templateId, hid }) {
      this.$router.push({ path: '/formDetail', query: { templateId } })
    },
    queryListUserFormData() {
      const { query } = this
      this.loading = true
      getTemplateList(query).then((res) => {
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
