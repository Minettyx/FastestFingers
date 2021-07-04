import { App } from 'vue'

export default {
  install: (app: App<Element>): void => {
    app.mixin({
      methods: {
        async $logIn () {
          const authCode = await this.$gAuth.getAuthCode()
          this.$setCookie('STOKEN', authCode, 30)
          this.$socket.reload()
        },
        async $logOut () {
          await this.$gAuth.signOut()
          this.$eraseCookie('STOKEN')
          this.$socket.reload()
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
