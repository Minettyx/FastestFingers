<template>
<div class="container">
  <div class="card">
    <div class="card-body">
      <p>users: {{ $game.users.value }}</p>
      <p>streak: {{ $game.streak.value }}</p>
      <p>streakUser: {{ $game.streakUser.value }}</p>
      <p>question: {{ $game.question.value }}</p>
      <p>wordcount: {{ $game.wordcount.value }}</p>
      <p>waiting: {{ $game.waiting.value }}</p>
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
  <button type="submit" class="btn btn-primary" @click="$game.autoJoinGame()">Auto Join</button>
  <br>
  <button type="button" class="btn btn-secondary" @click="$logOut()">LogOut</button>
  <button type="button" class="btn btn-secondary" @click="darkmode = !darkmode">{{darkmode?'Light':'Dark'}} Theme</button>

</div>
</template>

<script lang="ts">
import Api from '@/api/Api'
import Game from '@/api/Game'
import MSocket from '@/api/socket'
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
    Game.onChat.addEventListener((data) => {
      this.messages.push(data)
    })

    Api.getProfile().then(console.log)
  },
  methods: {
    sendMsg () {
      MSocket.socket.emit('game.chat', this.send)
      this.send = ''
    }
  }
})
</script>
