<!--
 * @Author: xiangty
 * @Date: 2020-11-03 23:02:11
 * @LastEditTime: 2020-11-29 23:55:47
 * @LastEditors: Please set LastEditors
 * @Description: 表单展示页
 * @FilePath: \control-app\src\views\formInput\index.vue
-->
<template>
  <div class="form-input" formInput>
    <van-nav-bar :title="templateName" left-text="返回" left-arrow fixed @click-left="onClickLeft" />
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
        <van-cell v-if="item.tag === 'location'" :title="item.title" :label="item.content" />
        <van-field v-if="item.tag === 'data-select'" :label="item.title" class="custom-select">
          <template #input>
            <multiselect v-model="item.content" :options="item.options" :placeholder="item.tips" :searchable="false" :show-labels="false"> </multiselect>
          </template>
        </van-field>
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
    <div id="container"></div>
  </div>
</template>

<script>
import { NavBar, Form, Button, Field, Cell, Stepper, RadioGroup, Radio, CheckboxGroup, Checkbox, Calendar, Uploader, Popup, Area, Toast } from 'vant'
import Multiselect from 'vue-multiselect'
import { splitArrObj } from '@/utils/index.js'
import { fileUpload, saveForm, getUserFromData, getTemplate, updateUserFromData } from '@/api/form'
import areaList from '@/assets/json/area.js'
import { getLocation } from '@/utils/wxInit.js'
import aMap from '@/utils/aMap.js'
let geocoder
export default {
  name: 'formDetail',
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [Cell.name]: Cell,
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
      amap: undefined,
      fromPath: '', // 来源路由
      detailList: [],
      templateName: '表单控件',
      templateId: null,
      templateHid: null,
      showCalendar: false,
      showRangeCalendar: false,
      showArea: false,
      areaList // 数据格式见 Area 组件文档
    }
  },
  created() {
    const { templateId, hid, path } = this.$route.query
    this.templateId = templateId
    this.templateHid = hid
    this.fromPath = path
    if (path === '/formDetail') {
      this.queryTemplate()
    } else {
      this.queryUserFromData()
    }
  },
  methods: {
    queryAddress(lnglat) {
      aMap.init().then((AMap) => {
        this.amap = new window.AMap.Map('container', {
          resizeEnable: true
        })
        AMap.plugin('AMap.Geocoder', () => {
          geocoder = new AMap.Geocoder({
            city: '010', // 城市设为北京，默认：“全国”
            radius: 1000 // 范围，默认：500
          })
          geocoder.getAddress(lnglat, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              const { formattedAddress } = result.regeocode
              // result为对应的地理位置详细信息
              console.log(formattedAddress)
              this.setAddress(formattedAddress)
            } else {
              Toast({
                message: '根据经纬度查询地址失败'
              })
            }
          })
        })
      })
    },
    queryTemplate() {
      const { templateId } = this
      getTemplate({ templateId }).then((res) => {
        const { templateName, templateDetailList } = res.data
        this.templateName = templateName
        this.detailList = templateDetailList
        getLocation()
          .then((res) => {
            this.queryAddress(res)
          })
          .catch(() => {
            this.setAddress('定位失败')
          })
      })
    },
    queryUserFromData() {
      const { templateId, templateHid } = this
      getUserFromData({ templateId, hid: templateHid }).then((res) => {
        const { templateName, detailList } = res.data
        this.templateName = templateName
        this.detailList = splitArrObj(detailList, 'data').map((item) => {
          if ((item.tag === 'fileUpload' || item.tag === 'pic') && typeof item.content === 'string') {
            item.content = []
          }
          return item
        })
      })
    },
    /**
     * @description 赋值地址
     */
    setAddress(addr) {
      this.detailList = this.detailList.map((item) => {
        console.log(item.tag === 'location')
        if (item.tag === 'location') {
          item.content = addr
        }
        return item
      })
    },
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
        if (!detailList[index].content) {
          detailList[index].content = []
        }
        detailList[index].content.push(res.data)
      })
    },
    afterFileRead({ file }, index) {
      const { detailList } = this
      const formData = new FormData()
      formData.append('file', file)
      fileUpload(formData).then((res) => {
        if (!detailList[index].content) {
          detailList[index].content = []
        }
        detailList[index].content.push(res.data)
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
    onClickLeft() {
      this.$router.go(-1)
    },
    onSubmit(values) {
      const { detailList, templateId, templateHid, fromPath } = this
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
      const params = {
        templateId,
        data: detailList
      }
      if (fromPath === '/formDetail') {
        saveForm(params).then((res) => {
          if (res.code === 200) {
            this.$router.push({ path: `/formShow/formAlready` })
          } else {
            Toast.loading({
              type: 'fail',
              message: res.message
            })
          }
        })
      } else {
        params.hId = templateHid
        updateUserFromData(params).then((res) => {
          if (res.code === 200) {
            this.$router.push({ path: `/formShow/formAlready` })
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
}
</script>

<style lang="scss">
.form-input[formInput] {
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
