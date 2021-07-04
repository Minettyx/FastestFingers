import { App, ref, Ref } from 'vue'
import { io } from 'socket.io-client'
import Game from '../api/Game'
import Api from '@/api/Api'

export default {
  install: (app: App<Element>): void => {
    const mmm = new MSocket()
    app.config.globalProperties.$socket = mmm
    app.config.globalProperties.$api = mmm.api
    app.config.globalProperties.$game = mmm.game
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
    $api: Api
    $game: Game
  }
}

export class MSocket {
  public socket
  public logged: Ref<boolean | undefined> = ref(undefined)
  public loginError: Ref<string | undefined> = ref(undefined)
  public game: Game
  public api: Api

  private onSocketLoginExec?: (logged: boolean) => void
  public onSocketLogin (exec: (logged: boolean) => void): void {
    this.onSocketLoginExec = exec
  }

  constructor () {
    this.socket = io(process.env.VUE_APP_API_URL + '', {
      auth: {
        token: getCookie('STOKEN') + ''
      }
    })

    this.socket.on('logged', (logged: {ok: boolean, error: string}) => {
      this.logged.value = logged.ok && true
      this.loginError.value = logged.error
      this.onSocketLoginExec && this.onSocketLoginExec(logged && true)
    })

    this.game = new Game(this.socket)
    this.api = new Api(this)
  }

  public reload (): void {
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

  public autoJoinGame (): Promise<boolean> {
    return this.get<string, boolean>('game.autoJoin', '')
  }

  public joinGame (gameid: string): Promise<boolean> {
    return this.get<string, boolean>('game.join', gameid)
  }

  public leaveGame (): Promise<boolean> {
    return this.get<string, boolean>('game.leave', '')
  }
}
