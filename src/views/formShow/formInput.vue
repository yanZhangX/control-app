<!--
 * @Author: xiangty
 * @Date: 2020-11-03 23:02:11
 * @LastEditTime: 2020-12-10 23:27:25
 * @LastEditors: Please set LastEditors
 * @Description: 表单展示页
 * @FilePath: \control-app\src\views\formInput\index.vue
-->
<template>
  <div class="form-input" formInput>
    <van-nav-bar :title="templateName" left-text="返回" left-arrow fixed @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <div v-for="(item, index) in detailList" :key="index">
        <van-field v-if="item.tag === 'input'" :required="!!item.required" v-model="item.content" :name="item.name" :label="item.title" :placeholder="item.tips" />
        <van-field
          v-if="item.tag === 'textarea'"
          :required="!!item.required"
          v-model="item.content"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          :maxlength="item.characterLimit"
          :placeholder="item.tips"
          show-word-limit
        />
        <van-field v-if="item.tag === 'input-number'" :required="!!item.required" :label="item.title" class="custom-input">
          <template #input>
            <van-stepper v-model="item.content" />
          </template>
        </van-field>
        <van-field v-if="item.tag === 'select'" :required="!!item.required" :label="item.title" class="custom-select">
          <template #input>
            <multiselect v-model="item.content" :options="item.options" :placeholder="item.tips" :searchable="false" :show-labels="false"> </multiselect>
          </template>
        </van-field>
        <van-field
          class="custom-input"
          v-if="item.tag === 'radio'"
          readonly
          clickable
          name="picker"
          :required="!!item.required"
          :value="item.content"
          :label="item.title"
          :placeholder="item.tips"
          @click="showRadioPicker = true"
        />
        <van-popup v-if="item.tag === 'radio'" v-model="showRadioPicker" position="bottom">
          <van-picker show-toolbar :columns="item.options ? item.options : ['aaa']" @confirm="(e) => onRadioConfirm(e, index)" @cancel="showRadioPicker = false" />
        </van-popup>
        <van-field
          class="custom-input"
          v-if="item.tag === 'radio-group'"
          readonly
          clickable
          name="picker"
          :required="!!item.required"
          :label="item.title"
          :value="radioGroupValue(item.content)"
          :placeholder="item.tips"
          @click="showGroupPicker = true"
        />
        <van-popup v-if="item.tag === 'radio-group'" close-icon="close" :style="{ height: '30%' }" v-model="showGroupPicker" get-container="#RadioGroup" position="bottom">
          <div class="group-container">
            <div class="group-header">
              <a class="van-picker__cancel pick-btn" @click="hideGroupPicker(true, index)">取消</a>
              <a class="van-picker__confirm pick-btn" @click="hideGroupPicker()">确定</a>
            </div>
            <van-checkbox-group v-model="item.content">
              <van-cell-group>
                <van-cell v-for="(cell, cindex) in item.options" clickable :key="cindex" :title="cell" @click="toggleRadioGroup(cindex)">
                  <template #right-icon>
                    <van-checkbox shape="square" :name="cell" ref="checkboxes" />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
          </div>
        </van-popup>
        <!-- <van-field v-if="item.tag === 'radio'" :label="item.title" class="custom-input">
          <template #input>
            <van-radio-group v-model="item.content" direction="horizontal">
              <template v-for="(val, key) in item.options">
                <van-radio :name="val" :key="key">{{ val }}</van-radio>
              </template>
            </van-radio-group>
          </template>
        </van-field> -->
        <!-- <van-field v-if="item.tag === 'radio-group'" :label="item.title" class="custom-input">
          <template #input>
            <van-checkbox-group v-model="item.contnet" direction="horizontal">
              <van-checkbox name="a">复选框 a</van-checkbox>
              <template v-for="(val, key) in item.options">
                <van-checkbox :name="val" :key="key">{{ val }}</van-checkbox>
              </template>
            </van-checkbox-group>
          </template>
        </van-field> -->
        <van-field
          v-if="item.tag === 'date'"
          readonly
          clickable
          name="calendar"
          :required="!!item.required"
          :value="item.content"
          :label="item.title"
          :placeholder="item.tips"
          @click="showCalendar = true"
        />
        <van-calendar v-if="item.tag === 'date'" v-model="showCalendar" :min-date="minDate" :max-date="maxDate" @confirm="(e) => onDateConfirm(e, index)" />
        <van-field v-if="item.tag === 'range-date'" readonly clickable name="calendar" :value="dateRangeValue(item.content)" label="日历" :placeholder="item.tips" @click="showRangeCalendar = true" />
        <van-calendar v-if="item.tag === 'range-date'" type="range" v-model="showRangeCalendar" :min-date="minDate" :max-date="maxDate" @confirm="(e) => onRangeConfirm(e, index)" />
        <van-field v-if="item.tag === 'pic'" :required="!!item.required" name="uploader" :label="item.title">
          <template #input>
            <van-uploader
              multiple
              v-model="item.content"
              :after-read="(e, detail) => afterRead(e, detail, index)"
              :preview-full-image="false"
              :capture="item.camera"
              @click-preview="(e, detail) => previewImg(e, detail, index)"
            />
          </template>
        </van-field>
        <van-field v-if="item.tag === 'file'" name="uploader" :required="!!item.required" :label="item.title">
          <template #input>
            <van-uploader v-model="item.content" :after-read="(e, detail) => afterFileRead(e, detail, index)" />
          </template>
        </van-field>
        <van-field v-if="item.tag === 'tooltips'" v-model="item.content" type="text" :required="!!item.required" :label="item.title" :placeholder="item.tips" />
        <van-field v-if="item.tag === 'address'" readonly clickable :required="!!item.required" :value="item.content" :label="item.title" :placeholder="item.tips" @click="showArea = true" />
        <van-cell v-if="item.tag === 'location'" :title="item.title" :label="item.content" :required="!!item.required" />
        <van-field v-if="item.tag === 'data-select'" :required="!!item.required" :label="item.title" class="custom-select">
          <template #input>
            <multiselect v-model="item.content" :options="item.options" :placeholder="item.tips" :searchable="false" :show-labels="false"> </multiselect>
          </template>
        </van-field>
        <van-popup v-if="item.tag === 'address'" v-model="showArea" position="bottom">
          <van-area :area-list="areaList" @confirm="(e) => onAreaConfirm(e, index)" @cancel="showArea = false" />
        </van-popup>
      </div>
      <div style="margin: 16px">
        <div @click="showToast">
          <van-button round block type="info" :loading="submitLoading" native-type="submit" :disabled="moidfyBoolean">提交</van-button>
        </div>
      </div>
    </van-form>
    <div id="container"></div>
  </div>
</template>

<script>
import { NavBar, Form, Button, Field, CellGroup, Cell, Stepper, RadioGroup, Radio, CheckboxGroup, Checkbox, Calendar, Uploader, Popup, Area, Toast, Picker, ImagePreview } from 'vant'
import Multiselect from 'vue-multiselect'
import { splitArrObj } from '@/utils/index.js' // aMapLocation
import { fileUpload, getUserFromData, getTemplate, saveForm, updateUserFromData } from '@/api/form'
import areaList from '@/assets/json/area.js'
import aMap from '@/utils/aMap.js'
import { getLocation } from '@/utils/wxInit.js'
import moment from 'moment'
let geocoder

export default {
  name: 'formDetail',
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
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
    [Picker.name]: Picker,
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
      showRadioPicker: false,
      showGroupPicker: false,
      showCalendar: false,
      showRangeCalendar: false,
      showArea: false,
      submitLoading: false,
      moidfy: 1, // 可编辑状态
      areaList // 数据格式见 Area 组件文档
    }
  },
  computed: {
    moidfyBoolean() {
      const { moidfy } = this
      return moidfy !== 1
    },
    radioGroupValue() {
      return function(value) {
        if (value) {
          if (typeof value === 'string') {
            value = JSON.parse(value)
          }
          return value.join(',')
        }
      }
    },
    dateRangeValue() {
      return function(value) {
        if (value) {
          if (typeof value === 'string') {
            value = JSON.parse(value)
          }
          return value.join('至')
        }
      }
    },
    minDate() {
      return new Date(moment().subtract(5, 'years'))
    },
    maxDate() {
      return new Date(moment().add(5, 'years'))
    }
  },
  created() {
    const { templateId, hid, path } = this.$route.query
    this.templateId = templateId
    this.templateHid = hid
    this.fromPath = path
    if (path === '/formShow/formList') {
      this.queryTemplate()
    } else {
      this.queryUserFromData()
    }
  },
  methods: {
    // queryAddress() {
    //   aMap.init().then(() => {
    //     this.setAddress('定位中...')
    //     aMapLocation()
    //       .then((res) => {
    //         this.setAddress(res.formattedAddress)
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //         this.setAddress('定位失败')
    //       })
    //   })
    // },
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
        const { templateName, templateDetailList, moidfy } = res.data
        this.moidfy = moidfy
        this.templateName = templateName
        this.detailList = templateDetailList
        // try {
        //   this.queryAddress(res)
        // } catch (e) {
        //   console.log(e)
        // }
        this.queryLocation()
      })
    },
    queryLocation() {
      this.setAddress('定位中...')
      getLocation()
        .then((res) => {
          console.log(res)
          this.queryAddress(res)
        })
        .catch(() => {
          this.setAddress('定位失败')
        })
    },
    queryUserFromData() {
      const { templateId, templateHid } = this
      getUserFromData({ templateId, hid: templateHid }).then((res) => {
        const { templateName, detailList, moidfy } = res.data
        this.templateName = templateName
        this.moidfy = moidfy
        this.detailList = splitArrObj(detailList, 'data').map((item) => {
          if ((item.tag === 'fileUpload' || item.tag === 'pic' || item.tag === 'radio-group' || item.tag === 'range-date') && !item.content) {
            item.content = []
          }
          if ((item.tag === 'fileUpload' || item.tag === 'pic' || item.tag === 'radio-group' || item.tag === 'range-date') && typeof item.content === 'string') {
            item.content = JSON.parse(item.content)
          }
          if (item.tag === 'location' && (item.content === '定位中...' || item.content === '定位失败')) {
            this.queryLocation()
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
        if (item.tag === 'location') {
          item.content = addr
        }
        return item
      })
    },
    onRadioConfirm(value, index) {
      console.log(index)
      const { detailList } = this
      detailList[index].content = value
      this.showRadioPicker = false
    },
    toggleRadioGroup(index) {
      this.$refs.checkboxes[index].toggle()
    },
    onDateConfirm(date, index) {
      const { detailList } = this
      detailList[index].content = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.showCalendar = false
    },
    onRangeConfirm(date, index) {
      const [start, end] = date
      const { detailList } = this
      detailList[index].content = [moment(start).format('YYYY/MM/DD'), moment(end).format('YYYY/MM/DD')]
      this.showRangeCalendar = false
    },
    // 此时可以自行将文件上传至服务器
    afterRead({ file }, { index: key }, index) {
      const { detailList } = this
      const formData = new FormData()
      formData.append('file', file)
      fileUpload(formData).then((res) => {
        detailList[index].content[key] = {
          url: res.data,
          name: file.name
        }
      })
    },
    previewImg({ file }, { index: key }, index) {
      const { detailList } = this
      console.log('aa', index)
      const images = detailList[index].content.map((e) => {
        return e.url
      })
      ImagePreview({
        images,
        startPosition: key
      })
    },
    afterFileRead({ file }, { index: key }, index) {
      const { detailList } = this
      const formData = new FormData()
      formData.append('file', file)
      fileUpload(formData).then((res) => {
        detailList[index].content[key] = {
          url: res.data,
          name: file.name
        }
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
      const { detailList, templateId, templateHid, fromPath, submitLoading } = this
      if (submitLoading) return
      this.submitLoading = true
      const complate = detailList.some((item) => {
        return item.required === 1 && !item.content
      })
      if (complate) {
        Toast.loading({
          type: 'fail',
          message: '你有未填写的必填项目'
        })
        this.submitLoading = false
        return
      }
      const params = {
        templateId,
        data: detailList
      }
      if (fromPath === '/formShow/formList') {
        saveForm(params)
          .then((res) => {
            if (res.code === 200) {
              this.$router.push({ path: `/formShow/formAlready` })
            } else {
              Toast.loading({
                type: 'fail',
                message: res.message
              })
            }
          })
          .finally(() => {
            this.submitLoading = false
          })
      } else {
        params.hId = templateHid
        updateUserFromData(params)
          .then((res) => {
            if (res.code === 200) {
              this.$router.push({ path: `/formShow/formAlready` })
            } else {
              Toast.loading({
                type: 'fail',
                message: res.message
              })
            }
          })
          .finally(() => {
            this.submitLoading = false
          })
      }
    },
    hideGroupPicker(clear = false, index) {
      if (clear) {
        const { detailList } = this
        detailList[index].content = []
      }
      this.showGroupPicker = false
    },
    showToast() {
      const { moidfyBoolean } = this
      if (moidfyBoolean) {
        Toast({
          message: '该项目暂时不可编辑'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.form-input[formInput] {
  padding-bottom: 20px;
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
  .group-header {
    height: 44px;
  }
  .group-container {
    position: relative;
    height: 100%;
    .group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .pick-btn {
        padding: 10px;
      }
    }
    .van-checkbox-group {
      height: calc(100% - 44px);
      overflow-y: scroll;
    }
  }
}
</style>
