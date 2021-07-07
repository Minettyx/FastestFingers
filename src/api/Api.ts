import { MSocket } from '@/api/socket'
import { ApiProfile, ApiPublicProfile, ApiTopWinsUser, ApiTopWordSpeed } from '@/types'

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

  getProfile (): Promise<ApiProfile> {
    return this.$socket.get<string, ApiProfile>('profile', '')
  }

  getPublicProfile (userid: string): Promise<ApiPublicProfile> {
    return this.$socket.get<string, ApiPublicProfile>('publicProfile', userid)
  }

  setUsername (newusername: string): Promise<boolean> {
    return this.$socket.get<string, boolean>('setUsername', newusername)
  }

  getTopWins (limit: number, page = 0): Promise<ApiTopWinsUser[]> {
    return this.$socket.get<{limit: number, page?: number}, ApiTopWinsUser[]>('topWins', { limit, page })
  }

  getTopWordSpeed (limit: number, page = 0): Promise<ApiTopWordSpeed[]> {
    return this.$socket.get<{limit: number, page?: number}, ApiTopWordSpeed[]>('topWordSpeeds', { limit, page })
  }
}
