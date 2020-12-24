<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { wxConfig } from '@/utils/wxInit.js'
import aMap from '@/utils/aMap.js'
export default {
  name: 'App',
  created() {
    wxConfig()
  },
  mounted() {
    aMap.init()
  }
}
</script>
