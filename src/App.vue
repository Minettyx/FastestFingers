<template>
  <router-view :key="$route.fullPath" style="text-align: center;"
    v-if="($socket.logged.value === true && $route.path !== '/login') || ($socket.logged.value === false && $route.path === '/login')
  "/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MSocket from './api/socket'

export default defineComponent({
  name: 'App',
  watch: {
    /** redirect to "/login" if not logged in and to "/" if visiting "/login" while logged in */
    '$socket.logged': {
      handler () {
        if (MSocket.logged.value === true && this.$route.path === '/login') {
          this.$router.push('/')
        } else if (MSocket.logged.value === false && this.$route.path !== '/login') {
          this.$router.push('/login')
        }
      },
      deep: true
    }
  }
})
</script>
