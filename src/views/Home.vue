<template>
<div>
  <p v-for="msg in messages" :key="msg">{{ msg.username }}: {{ msg.message }}</p>

  <form @submit.prevent="this.$socket.socket.send(search)&&sendMsg()">
    <input v-model="search" type="search" class="form-control" placeholder="Send">
  </form>

  <button @click="$logOut()">LogOut</button>

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  data () {
    return {
      messages: [] as {username: string, message: string}[],
      search: ''
    }
  },
  mounted () {
    this.$socket.socket.on('message', (data) => {
      this.messages.push(data)
    })
  },
  methods: {
    sendMsg () {
      this.search = ''
    }
  }
})
</script>
