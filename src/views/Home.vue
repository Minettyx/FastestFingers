<template>
<div class="container">

  <br>
  <div class="card">
    <div class="card-body">
      <p style="text-align: left" v-for="msg in messages" :key="msg">{{ msg.username }}: {{ msg.message }}</p>
    </div>
  </div>

  <form @submit.prevent="this.$socket.socket.send(send)&&sendMsg()" class="form-inline">
    <div class="row g-3 align-items-center">
      <div class="col">
        <input v-model="send" type="text" class="form-control " placeholder="Message">
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary">Send</button>
      </div>
    </div>
  </form>

  <br>
  <button type="button" class="btn btn-secondary" @click="$logOut()">LogOut</button>
  <button type="button" class="btn btn-secondary" @click="darkmode = !darkmode">{{darkmode?'Light':'Dark'}} Theme</button>

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  data () {
    return {
      messages: [] as {username: string, message: string}[],
      send: ''
    }
  },
  mounted () {
    this.$socket.socket.on('message', (data) => {
      this.messages.push(data)
    })
  },
  methods: {
    sendMsg () {
      this.send = ''
    }
  }
})
</script>
