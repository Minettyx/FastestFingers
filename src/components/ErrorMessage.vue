<template>
<div></div>
</template>

<script lang="ts">
import MSocket from '@/api/socket'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorMessage',
  mounted () {
    MSocket.onError.addEventListener(errorid => {
      this.$toast.show(this.idToMessage(errorid), { type: 'error', duration: 3000 })
    })
    console.log('NEW ERROR HANDLER')
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
