<template>
<div v-if="show">
  <div :class="`bg-${color}-500`" class="flex items-center text-white text-sm font-bold px-4 py-3 relative" role="alert">
      <svg width="20" height="20" fill="currentColor" class="w-4 h-4 mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M1216 1344v128q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h64v-384h-64q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h384q26 0 45 19t19 45v576h64q26 0 45 19t19 45zm-128-1152v192q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-192q0-26 19-45t45-19h256q26 0 45 19t19 45z">
          </path>
      </svg>
      <p>
        {{ error }}
      </p>
      <button class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="close()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="h-6 w-6 text-white" viewBox="0 0 1792 1792">
              <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z">
              </path>
          </svg>
      </button>
  </div>
  <div :class="`bg-${color}-400`" class="w-full" style="height: 4px">
    <div :class="`bg-${color}-600`" class="h-full text-center text-xs text-white" style="transition: width 0.05s" :style="{'width': `${progressbar}%`}"></div>
  </div>
</div>
</template>

<script lang="ts">
import MSocket from '@/api/socket'
import { defineComponent } from 'vue'

const TIMEOUT = 5000

export default defineComponent({
  name: 'ErrorMessage',
  data () {
    return {
      error: '',
      show: false,
      color: 'red',
      progressbar: 100,
      hideTimeout: false as number | false,
      hideInterval: false as number | false
    }
  },
  mounted () {
    MSocket.onError.addEventListener(errorid => {
      this.showError(errorid)
    })

    this.$error.addEventListener(({ id, message, color }) => {
      this.showError(id, message, color)
    })
  },
  methods: {
    showError (id?: string, message?: string, color?: string) {
      if (id) {
        this.error = this.idToMessage(id)
      } else {
        this.error = message || 'Unknown error.\n If the error persist please contact us.'
      }

      this.progressbar = 100
      this.color = color || 'red'
      this.show = true
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout)
      }
      if (this.hideInterval) {
        clearInterval(this.hideInterval)
      }
      this.hideTimeout = setTimeout(() => {
        this.show = false
        this.hideTimeout = false
        if (this.hideInterval) {
          clearInterval(this.hideInterval)
        }
      }, TIMEOUT)
      this.hideInterval = setInterval(() => {
        this.progressbar--
      }, TIMEOUT / 100)
    },
    close () {
      this.show = false
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout)
      }
      this.hideTimeout = false
    },
    idToMessage (errorId: string) {
      switch (errorId) {
        case 'UserNotFound':
          return 'Couldn\'t find this user.'
        case 'NameNotValid':
          return 'Sorry this username is already taken.'
        case 'AlreadyInGame':
          return 'Seems like you are already in a game.\nIf the error persist please contact us.'
        case 'NotInGame':
          return 'You are not in a game.'
        case 'MessageTooLong':
          return 'The message is too long.'
        case 'MessageRequired':
          return 'The message can\'t be empty'
        default:
          return `Unknown error: "${errorId}".\nIf the error persist please contact us.`
      }
    }
  }
})
</script>
