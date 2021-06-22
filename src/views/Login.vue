<template>
  <div>
    <h1>Test</h1>
    <button @click="handleClickSignIn">signIn</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'test',
  data () {
    return {
      interval: {} as any
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      if (this.$socket.logged) {
        this.$router.push('/')
      }
    }, 100)
  },
  beforeUnmount () {
    clearInterval(this.interval)
  },
  methods: {
    async handleClickSignIn () {
      try {
        const googleUser = await this.$gAuth.signIn()
        this.$setCookie('STOKEN', googleUser.getAuthResponse().id_token, 30)
        window.location.href = '/'
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>
