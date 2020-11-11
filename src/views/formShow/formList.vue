<!--
 * @Author: your name
 * @Date: 2020-11-04 23:42:03
 * @LastEditTime: 2020-11-08 23:11:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\views\formShow\formList.vue
-->
<template>
  <div class="form-list" formList>
    <!-- <template v-for="(item, index) in "></template> -->
    <div class="form-item">
      <p></p>
    </div>
  </div>
</template>

<script>
import { listUserFormData } from '@/api/form.js'
export default {
  data() {
    return {
      query: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
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
