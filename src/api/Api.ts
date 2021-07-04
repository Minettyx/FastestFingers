import { MSocket } from '@/plugins/socket'
import { ApiProfile } from '@/types'

export default class Api {
  private $socket: MSocket

  constructor (socket: MSocket) {
    this.$socket = socket
  }

  // this.$socket.get<string, ApiProfile>('profile', '').then(console.log)
  // this.$socket.get<string, ApiPublicProfile>('publicProfile', '60d58aa5a3911a1b98d7e97d').then(console.log)
  // this.$socket.get<string, boolean>('setUsername', 'Minettyx').then(console.log)
  // this.$socket.get<{limit: number, page?: number}, ApiTopWinsUser[]>('topWins', { limit: 10, page: 0 }).then(console.log)
  // this.$socket.get<{limit: number, page?: number}, ApiTopWordSpeed[]>('topWordSpeeds', { limit: 10, page: 0 }).then(console.log)

  getProfile () {
    return this.$socket.get<string, ApiProfile>('profile', '')
  }
}
