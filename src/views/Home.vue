<template>
<div class="container">
  <div class="card">
    <div class="card-body">
      <p>users: {{ $socket.game.users.value }}</p>
      <p>streak: {{ $socket.game.streak.value }}</p>
      <p>streakUser: {{ $socket.game.streakUser.value }}</p>
      <p>question: {{ $socket.game.question.value }}</p>
      <p>wordcount: {{ $socket.game.wordcount.value }}</p>
      <p>waiting: {{ $socket.game.waiting.value }}</p>
    </div>
  </div>
  <br>
  <div class="card">
    <div class="card-body">
      <p style="text-align: left" v-for="msg in messages" :key="msg">{{ msg.username }}: {{ msg.text }}</p>
    </div>
  </div>

  <form @submit.prevent="sendMsg()" class="form-inline">
    <div class="row g-3 align-items-center">
      <div class="col">
        <input v-model="send" type="text" class="form-control " placeholder="Message">
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary">Send</button>
      </div>
    </div>
  </form>
  <button type="submit" class="btn btn-primary" @click="$socket.autoJoinGame()">Auto Join</button>
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
      messages: [] as {username: string, text: string; userid: string;}[],
      send: ''
    }
  },
  mounted () {
    this.$socket.game.onChat((data) => {
      this.messages.push(data)
    })

    this.$api.getProfile().then(console.log)
  },
  methods: {
    sendMsg () {
      this.$socket.socket.emit('game.chat', this.send)
      this.send = ''
    }
  }
})
</script>
