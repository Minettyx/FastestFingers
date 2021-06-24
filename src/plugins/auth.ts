import { App } from 'vue'

export default {
  install: (app: App<Element>): void => {
    app.mixin({
      methods: {
        async $logIn () {
          const googleUser = await this.$gAuth.signIn()
          this.$setCookie('STOKEN', googleUser.getAuthResponse().id_token, 7)
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
