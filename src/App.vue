<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { wxConfig } from '@/utils/wxInit.js'
export default {
  name: 'App',
  created() {
    wxConfig()
  }
}
</script>
