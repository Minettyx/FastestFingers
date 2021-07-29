<template>
<div>
  <NavBar></NavBar>
  <br>
  <button v-if="!$game.inGame.value" class="px-6 py-2  transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none" @click="() => {$game.autoJoinGame(); messages=[]}">
    Join Game
  </button>
  <div class="container mx-auto" v-if="$game.inGame.value">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div class="shadow-lg rounded-md p-4 bg-white overflow-hidden w-full">
        <p v-if="!waiting" class=" text-sm" style="font-size: 4vw">Type ({{wordcount}}/10)</p>
        <div><p v-if="!waiting" class=" text-4xl pb-4 font-bold" style="font-size: 4vw">{{ question }}</p></div>
        <div v-if="waiting && success" class="bg-green-200 border-green-600 text-green-600 border-l-4 p-2" role="alert">
          <p><b>{{success.username}}</b> typed <i>{{success.word}}</i> in <b>{{$humanize(success.time)}}</b></p>
        </div>
        <div v-if="waiting && won" class="bg-green-200 border-green-600 text-green-600 border-l-4 p-2" role="alert">
          <p><span v-for="(w, i) in won" :key="w"><b>{{w.username}}</b>{{ won.length-1==i ? '' : ( won.length-2==i ? ' and ' : ', ' ) }}</span>won the game</p>
        </div>
        <div class="p-4 flex md:block flex-wrap items-center justify-center gap-3">
          <div class="p-1" v-for="user in users" :key="user">{{user.username}} <span type="button" class="w-6 h-6 text-base rounded-full text-white bg-gray-500 flex-shrink-0">{{user.points}}</span><span v-if="user.id == streakUser" type="button" class="w-6 h-6 text-base rounded-full text-white bg-red-500 flex-shrink-0">{{streak||0}}</span></div>
        </div>

        <button @click="$game.leaveGame()" type="button" class="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
          Leave Game
        </button>

      </div>

      <div class="shadow-lg rounded-md p-4 bg-white overflow-hidden w-full">
        <div class="overflow-y-auto" :style="{'height': chatboxheigth}" ref="chatbox">

          <div class="w-full flex py-1" v-for="msg in messages" :key="msg">
            <p v-if="msg.type == undefined" class="rounded-xl text-white px-2 py-1 leading-7 text-lg max-w-xl" :class="[$api.USERID.value!=msg.userid ? 'text-left bg-indigo-500 mr-auto' : 'text-right bg-green-500 ml-auto']">
              <span v-if="$api.USERID.value!=msg.userid" class="text-sm font-bold">{{msg.username}}</span><br v-if="$api.USERID.value!=msg.userid">
              <span>{{msg.text}}</span>
            </p>
            <p v-if="msg.type == 'join'" class="rounded-lg px-1 bg-gray-200 mx-auto"><b>{{msg.username}}</b> joined the game</p>
            <p v-if="msg.type == 'leave'" class="rounded-lg px-1 bg-gray-200 mx-auto"><b>{{msg.username}}</b> left the game</p>
          </div>

        </div>
        <div class="flex">
          <form class="w-full" @submit.prevent="sendMsg()">
            <input
              v-model="send"
              type="text"
              class="rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
              placeholder="Message"
            />
            <button type="submit" class="hidden"></button>
          </form>
          <button class="rounded-r-md inline-flex items-center px-3 border-t bg-white border-r border-b border-gray-300 text-gray-500 shadow-sm text-sm" @click="sendMsg()">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Game from '@/api/Game'
import MSocket from '@/api/socket'

export default defineComponent({
  name: 'Game',
  components: {
    NavBar
  },
  setup () {
    const chatbox = ref<HTMLDivElement>()

    return {
      chatbox
    }
  },
  data () {
    return {
      chatboxheigth: '',
      heigthupdateInterval: false as number | false,

      messages: [] as {username: string, text: string; userid: string; type?: string}[],
      send: '',
      users: this.$game.users,
      streak: this.$game.streak,
      streakUser: this.$game.streakUser,
      question: this.$game.question,
      wordcount: this.$game.wordcount,
      waiting: this.$game.waiting,
      success: false as {
        userid: string;
        word: string;
        time: number;
        username: string;
      } | false,
      won: false as {
        id: string;
        points: number;
        username: string;
      }[] | false
    }
  },
  watch: {
    windowHeight: {
      handler () {
        this.calcHeight()
      },
      deep: true
    },
    windowWidth: {
      handler () {
        this.calcHeight()
      },
      deep: true
    },
    waiting () {
      if (!this.waiting) {
        this.success = false
        this.won = false
      }
    }
  },
  mounted () {
    this.heigthupdateInterval = setInterval(this.calcHeight, 10)

    Game.onChat.addEventListener((data) => {
      this.messages.push(data)
      this.scrollDown()
    })

    Game.onSuccess.addEventListener((data) => {
      this.success = data
    })

    Game.onWon.addEventListener((data) => {
      this.won = data
    })

    Game.onJoinMessage.addEventListener(data => {
      this.messages.push({
        username: data.username,
        text: '',
        userid: data.id,
        type: 'join'
      })
      this.scrollDown()
    })

    Game.onLeaveMessage.addEventListener(data => {
      this.messages.push({
        username: data.username,
        text: '',
        userid: data.id,
        type: 'leave'
      })
      this.scrollDown()
    })
  },
  beforeUnmount () {
    if (this.heigthupdateInterval) {
      clearInterval(this.heigthupdateInterval)
    }
  },
  methods: {
    calcHeight () {
      if (this.viewport <= 2) {
        // eslint-disable-next-line
        const v = this.windowHeight - (this.chatbox?.getBoundingClientRect().top || 0) - 123
        this.chatboxheigth = v + 'px'
      } else {
        this.chatboxheigth = 'calc( 100vh - 180px )'
      }
    },
    sendMsg () {
      if (this.send) {
        MSocket.socket.emit('game.chat', this.send)
        this.send = ''
      }
    },
    scrollDown () {
      if (this.chatbox) {
        if (this.chatbox.scrollTop + this.chatbox.clientHeight === this.chatbox.scrollHeight) {
          setTimeout(() => {
            if (this.chatbox) {
              this.chatbox.scrollTop = this.chatbox.scrollHeight
            }
          }, 10)
        }
      }
    }
  }
})
</script>
