<!--
 * @Author: xiangty
 * @Date: 2020-11-03 23:02:11
 * @LastEditTime: 2020-11-14 01:20:31
 * @LastEditors: Please set LastEditors
 * @Description: 表单展示页
 * @FilePath: \control-app\src\views\formShow\index.vue
-->
<template>
  <div class="formShow" formShow>
    <van-nav-bar title="表单详情" left-text="返回" left-arrow fixed @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <div v-for="(item, index) in detailList" :key="index">
        <van-field v-if="item.tag === 'input'" v-model="item.content" :name="item.name" :label="item.title" :placeholder="item.tips" />
        <van-field v-if="item.tag === 'textarea'" v-model="item.content" rows="2" autosize label="留言" type="textarea" :maxlength="item.characterLimit" :placeholder="item.tips" show-word-limit />
        <van-field v-if="item.tag === 'input-number'" :label="item.title" class="custom-input">
          <template #input>
            <van-stepper v-model="item.content" />
          </template>
        </van-field>
        <van-field v-if="item.tag === 'select'" :label="item.title" class="custom-select">
          <template #input>
            <multiselect v-model="item.content" :options="item.options" :placeholder="item.tips" :searchable="false" :show-labels="false"> </multiselect>
          </template>
        </van-field>
        <van-field v-if="item.tag === 'radio'" :label="item.title" class="custom-input">
          <template #input>
            <van-radio-group v-model="item.content" direction="horizontal">
              <template v-for="(val, key) in item.options">
                <van-radio :name="val" :key="key">{{ val }}</van-radio>
              </template>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-if="item.tag === 'radio-group'" :label="item.title" class="custom-input">
          <template #input>
            <van-checkbox-group v-model="item.contnet" direction="horizontal">
              <van-checkbox name="a">复选框 a</van-checkbox>
              <template v-for="(val, key) in item.options">
                <van-checkbox :name="val" :key="key">{{ val }}</van-checkbox>
              </template>
            </van-checkbox-group>
          </template>
        </van-field>
        <van-field v-if="item.tag === 'date'" readonly clickable name="calendar" :value="item.content" label="日历" :placeholder="item.tips" @click="showCalendar = true" />
        <van-calendar v-model="showCalendar" @confirm="(e) => onDateConfirm(e, index)" />
        <van-field v-if="item.tag === 'range-date'" readonly clickable name="calendar" :value="item.content" label="日历" :placeholder="item.tips" @click="showRangeCalendar = true" />
        <van-calendar v-model="showRangeCalendar" @confirm="(e) => onRangeConfirm(e, index)" />
        <van-field v-if="item.tag === 'pic'" name="uploader" :label="item.title">
          <template #input>
            <van-uploader v-model="item.content" :after-read="(e) => afterRead(e, index)" />
          </template>
        </van-field>
        <van-field v-if="item.tag === 'file'" name="uploader" :label="item.title">
          <template #input>
            <van-uploader v-model="item.content" :after-read="(e) => afterFileRead(e, index)" accept=".doc,.pdf,xls" />
          </template>
        </van-field>
        <van-field v-if="item.tag === 'tooltips'" v-model="item.content" type="text" :label="item.title" :placeholder="item.tips" />
        <van-field v-if="item.tag === 'address'" readonly clickable :value="item.content" :label="item.title" :placeholder="item.tips" @click="showArea = true" />
        <van-popup v-model="showArea" position="bottom">
          <van-area :area-list="areaList" @confirm="(e) => onAreaConfirm(e, index)" @cancel="showArea = false" />
        </van-popup>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { NavBar, Form, Button, Field, Stepper, RadioGroup, Radio, CheckboxGroup, Checkbox, Calendar, Uploader, Popup, Area, Toast } from 'vant'
import Multiselect from 'vue-multiselect'
import { listUserFormDetail, fileUpload, saveForm } from '@/api/form'
import areaList from '@/assets/json/area.js'
export default {
  name: 'formDetail',
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [Stepper.name]: Stepper,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [Calendar.name]: Calendar,
    [Uploader.name]: Uploader,
    [Popup.name]: Popup,
    [Area.name]: Area,
    Multiselect
  },
  data() {
    return {
      detailList: [],
      username: '',
      password: '',
      templateId: null,
      value: null,
      date: '',
      showCalendar: false,
      showRangeCalendar: false,
      radio: '1',
      result: [],
      showArea: false,
      areaList // 数据格式见 Area 组件文档
    }
  },
  created() {
    this.templateId = this.$route.query.templateId
    this.queryListUserFormDetail()
  },
  methods: {
    onDateConfirm(date, index) {
      const { detailList } = this
      detailList[index].content = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.showCalendar = false
    },
    onRangeConfirm(date, index) {
      const { detailList } = this
      detailList[index].content = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.showRangeCalendar = false
    },
    // 此时可以自行将文件上传至服务器
    afterRead({ file }, index) {
      const { detailList } = this
      const formData = new FormData()
      formData.append('file', file)
      fileUpload(formData).then((res) => {
        detailList[index].content = res.data
      })
    },
    afterFileRead({ file }, index) {
      const { detailList } = this
      const formData = new FormData()
      formData.append('file', file)
      fileUpload(formData).then((res) => {
        detailList[index].content = res.data
      })
    },
    onAreaConfirm(values, index) {
      const { detailList } = this
      detailList[index].content = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/')
      this.showArea = false
    },
    queryListUserFormDetail() {
      listUserFormDetail({ templateId: this.templateId }).then((res) => {
        const { detailList } = res.data
        this.detailList = detailList
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onSubmit(values) {
      const { detailList } = this
      const complate = detailList.some((item) => {
        return item.required === 1 && item.content
      })
      if (!complate) {
        Toast.loading({
          type: 'fail',
          message: '你有未填写的项目'
        })
        return
      }
      saveForm(detailList).then((res) => {
        if (res.code === 200) {
          this.$router.go(-1)
        } else {
          Toast.loading({
            type: 'fail',
            message: res.message
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.formShow[formShow] {
  .van-form {
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
