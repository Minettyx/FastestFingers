<template>
  <div class="container" v-if="show" style="backgroud-color: red">
    <h5>{{ error }}</h5>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

let hideTimeout: number | false
export default defineComponent({
  name: 'ErrorMessage',
  data () {
    return {
      error: '',
      show: false
    }
  },
  mounted () {
    this.$socket.socket.on('error', errorid => {
      this.error = this.idToMessage(errorid)
      this.show = true
      if (hideTimeout) {
        clearTimeout(hideTimeout)
      }
      hideTimeout = setTimeout(() => {
        this.show = false
        hideTimeout = false
      }, 5000)
    })
  },
  methods: {
    idToMessage (errorId: string) {
      switch (errorId) {
        case 'UserNotFound':
          return 'Couldn\'t find this user.'
        case 'NameNotValid':
          return 'The username needs to be between 3 and 32 characters.'
        case 'AlreadyInGame':
          return 'Seems like you are already in a game.\nIf the error persist please contact us.'
        case 'NotInGame':
          return 'You are not in a game.'
        case 'MessageTooLong':
          return 'The message is too long.\n'
        default:
          return `Unknown error: "${errorId}".\nIf the error persist please contact us.`
      }
    }
  }
})
</script>
