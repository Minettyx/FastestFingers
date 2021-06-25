import { App, ref, Ref } from 'vue'
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
  public logged: Ref<boolean | undefined> = ref(undefined)

  private onSocketLoginExec?: (logged: boolean) => void
  public onSocketLogin (exec: (logged: boolean) => void) {
    this.onSocketLoginExec = exec
  }

  constructor () {
    this.socket = io(process.env.VUE_APP_API_URL + '', {
      auth: {
        token: getCookie('STOKEN') + ''
      }
    })

    this.socket.on('logged', logged => {
      this.logged.value = logged && true
      this.onSocketLoginExec && this.onSocketLoginExec(logged && true)
    })
  }

  public reload () {
    this.logged.value = undefined
    this.socket.disconnect()
    this.constructor()
  }

  public get<I, O> (path: string, data: I): Promise<O> {
    return new Promise((resolve) => {
      const uid = Math.random().toString(36).substr(2, 9)
      this.socket.emit(path, { uid, data })
      this.socket.on(uid, (res: O) => {
        this.socket.off(uid)
        resolve(res)
      })
    })
  }
}
