import { ref, Ref } from 'vue'
import { io, Socket } from 'socket.io-client'
import Game from '@/api/Game'
import { Utils } from '@/plugins/functions'
import Listener from '@/classes/Listener'

class MSocketClass {
  socket!: Socket
  logged: Ref<boolean | undefined> = ref(undefined)
  loginError: Ref<string | undefined> = ref(undefined)

  onSocketLogin = new Listener<boolean>()
  onError = new Listener<string>()

  constructor () {
    this.setup()
  }

  setup (): void {
    // reset variables and disconnect socket if not first
    this.socket && this.socket.disconnect && this.socket.disconnect()
    this.logged.value = undefined
    this.loginError.value = undefined

    // connect so socket
    this.socket = io(process.env.VUE_APP_API_URL + '', {
      auth: {
        token: Utils.getCookie('STOKEN') + ''
      }
    })

    // check if logged
    this.socket.on('logged', (logged: {ok: boolean, error: string}) => {
      this.logged.value = logged.ok && true
      this.loginError.value = logged.error
      this.onSocketLogin.emit(logged.ok && true)

      // setup apis
      if (this.logged.value) {
        Game.setup()
      }
    })

    this.socket.on('error', errorid => {
      this.onError.emit(errorid)
    })
  }

  get<I, O> (path: string, data: I): Promise<O> {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Socket not initialized'))
        return
      }
      const uid = Math.random().toString(36).substr(2, 9)
      this.socket.emit(path, { uid, data })
      this.socket.on(uid, (res: O) => {
        if (this.socket) { // don't need to check but it gives an error dunno why
          this.socket.off(uid)
        }
        resolve(res)
      })
    })
  }
}

const MSocket = new MSocketClass()
export default MSocket
