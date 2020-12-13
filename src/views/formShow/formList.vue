<!--
 * @Author: your name
 * @Date: 2020-11-04 23:42:03
 * @LastEditTime: 2020-12-10 22:50:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\views\formShow\formList.vue
-->
<template>
  <div class="form-list" formList>
    <van-nav-bar title="模板列表" fixed />
    <van-list class="main-body" v-if="formList.length > 0" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryListUserFormData">
      <van-grid :column-num="3">
        <template v-for="(item, index) in formList">
          <van-grid-item :key="index" :icon="item.iconUrl ? item.iconUrl : 'photo-o'" :text="item.templateName" @click.native="toDetail(item)" />
        </template>
      </van-grid>
    </van-list>
    <van-empty v-if="formList.length === 0" description="暂无数据" />
  </div>
</template>

<script>
import { getTemplateList } from '@/api/form.js'
import { NavBar, Cell, CellGroup, Col, Row, Tag, Empty, List, Grid, GridItem } from 'vant'
export default {
  name: 'formList',
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Col.name]: Col,
    [Row.name]: Row,
    [Tag.name]: Tag,
    [Empty.name]: Empty,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
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
      const { $route } = this
      this.$router.push({ path: '/formInput', query: { templateId, hid, path: $route.path } })
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
        } else {
          query.currentPage++
        }
      })
    }
  },
  created() {
    this.queryListUserFormData()
  }
}
</script>
