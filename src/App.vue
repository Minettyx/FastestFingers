<template>
  <router-view :key="$route.fullPath" style="text-align: center;"
    v-if="($socket.logged.value === true && $route.path !== '/login') || ($socket.logged.value === false && $route.path === '/login')
  "/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  watch: {
    '$socket.logged': {
      handler () {
        if (this.$socket.logged.value === true && this.$route.path === '/login') {
          this.$router.push('/')
        } else if (this.$socket.logged.value === false && this.$route.path !== '/login') {
          this.$router.push('/login')
        }
      },
      deep: true
    }
  }
})
</script>
