<!--
 * @Author: xianvgty
 * @Date: 2020-11-14 11:48:22
 * @LastEditTime: 2020-12-07 00:35:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\views\formShow\formAready.vue
-->
<template>
  <div class="form-already" formAlready>
    <van-nav-bar title="已填写列表" fixed />
    <div class="main-body">
      <van-search v-model="searchValue" show-action label="标题" placeholder="请输入搜索关键词" @search="onSearchAlready">
        <template #action>
          <van-button :color="themeColor" size="mini" @click="onSearchAlready(searchValue)">搜索</van-button>
        </template>
      </van-search>
      <van-dropdown-menu :active-color="themeColor">
        <van-dropdown-item v-model="query.examine" :options="examines" @change="onChangeExamine" />
        <van-dropdown-item :title="query.createTime ? query.createTime : '请选择日期'" ref="submitTime">
          <van-calendar :color="themeColor" :min-date="minDate" :max-date="maxDate" :show-title="false" :poppable="false" :style="{ height: '400px' }" @confirm="onSubmitTimeConfirm" />
          <div class="option-btns">
            <van-button block round @click="resetDate">重置</van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
      <van-skeleton :row="20" :loading="loading" />
      <van-list v-if="formList.length > 0" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryListUserFormData">
        <template v-for="(item, index) in formList">
          <van-cell :value="item.createTime" is-link @click.native="toDetail(item)" :key="index">
            <template #title>
              <div class="title-wrap">
                <span class="custom-title">{{ item.templateName }}</span>
                <van-tag :type="item.examine === '已审核' ? 'success' : item.examine === '已驳回' ? 'danger' : 'warning'" plain>{{ item.examine }}</van-tag>
              </div>
            </template>
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
  </div>
</template>

<script>
import { formListAready } from '@/api/form.js'
import { NavBar, Cell, CellGroup, Col, Row, Tag, Empty, List, Skeleton, Search, DropdownMenu, DropdownItem, Calendar, Button } from 'vant'
import moment from 'moment'
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
    [Skeleton.name]: Skeleton,
    [Search.name]: Search,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Calendar.name]: Calendar,
    [Button.name]: Button
  },
  data() {
    return {
      searchValue: '',
      themeColor: '#1989fa',
      formList: [],
      examines: [
        { text: '全部', value: undefined },
        { text: '已审核', value: '已审核' },
        { text: '已驳回', value: '已驳回' },
        { text: '未审核', value: '未审核' }
      ],
      query: {
        currentPage: 1,
        pageSize: 10,
        templateName: undefined,
        examine: undefined,
        createTime: undefined
      },
      finished: false,
      loading: false,
      pageTotal: undefined
    }
  },
  computed: {
    minDate() {
      return new Date(moment().subtract(5, 'years'))
    },
    maxDate() {
      return new Date(moment().add(5, 'years'))
    }
  },
  methods: {
    toDetail({ templateId, hid, moidfy }) {
      // if (!moidfy) {
      //   Toast({
      //     message: '该表单不可编辑'
      //   })
      //   return
      // }
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
    },
    /**
     * @description 搜索模板名称
     */
    onSearchAlready(e) {
      const { query } = this
      query.templateName = e
      query.currentPage = 1
      this.formList = []
      this.queryListUserFormData()
    },
    /**
     * @description 充值搜索条件
     */
    resetDate() {
      this.query.createTime = undefined
      this.formList = []
      this.queryListUserFormData()
      this.$refs.submitTime.toggle()
    },
    onChangeExamine() {
      const { query } = this
      query.currentPage = 1
      this.formList = []
      this.queryListUserFormData()
    },
    onSubmitTimeConfirm(date) {
      const { query } = this
      query.createTime = moment(date).format('YY-MM-DD')
      query.currentPage = 1
      this.formList = []
      this.queryListUserFormData()
      this.$refs.submitTime.toggle()
    }
  },
  created() {
    this.queryListUserFormData()
  }
}
</script>

<style lang="scss" scoped>
.form-already {
  .option-btns {
    padding: 0 16px 24px;
  }
  .van-cell__title {
    flex: 0 0 60%;
  }
  .title-wrap {
    display: flex;
    align-items: center;
    .custom-title {
      display: inline-block;
      max-width: 150px;
      margin-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
<style lang="scss">
.form-already[formAlready] {
  .van-dropdown-item__content {
    max-height: 100%;
  }
}
</style>
