import { App } from 'vue'
import { io } from 'socket.io-client'

export default {
  install: (app: App<Element>): void => {
    app.config.globalProperties.$socket = new MSocket()
  }
}

function getCookie (name: string): string | null {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $socket: MSocket
  }
}

class MSocket {
  public socket
  public logged: boolean | undefined = undefined

  constructor () {
    this.socket = io('https://ffws.0kb.eu' + '', {
      auth: {
        token: getCookie('STOKEN') + ''
      }
    })

    this.socket.on('logged', logged => {
      this.logged = logged
      if (!logged) {
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }
    })
  }
}
