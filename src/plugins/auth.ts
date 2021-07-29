import MSocket from '@/api/socket'
import { App } from 'vue'

export default {
  install: (app: App<Element>): void => {
    app.mixin({
      methods: {
        async $logIn () {
          const authCode = await this.$gAuth.getAuthCode()
          this.$setCookie('STOKEN', authCode, 30)
          MSocket.setup()
        },
        async $logOut () {
          MSocket.socket.emit('logout')
          await this.$gAuth.signOut()
          this.$eraseCookie('STOKEN')
          MSocket.setup()
        }
      }
    })
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $logIn: () => Promise<void>
    $logOut: () => Promise<void>
  }
}
