import MSocket from '@/api/socket'
import { ApiProfile, ApiPublicProfile, ApiTopWinsUser, ApiTopWordSpeed } from '@/types'

class ApiClass {
  // this.$socket.get<string, ApiProfile>('profile', '').then(console.log)
  // this.$socket.get<string, ApiPublicProfile>('publicProfile', '60d58aa5a3911a1b98d7e97d').then(console.log)
  // this.$socket.get<string, boolean>('setUsername', 'Minettyx').then(console.log)
  // this.$socket.get<{limit: number, page?: number}, ApiTopWinsUser[]>('topWins', { limit: 10, page: 0 }).then(console.log)
  // this.$socket.get<{limit: number, page?: number}, ApiTopWordSpeed[]>('topWordSpeeds', { limit: 10, page: 0 }).then(console.log)

  getProfile (): Promise<ApiProfile> {
    return MSocket.get<string, ApiProfile>('profile', '')
  }

  getPublicProfile (userid: string): Promise<ApiPublicProfile> {
    return MSocket.get<string, ApiPublicProfile>('publicProfile', userid)
  }

  setUsername (newusername: string): Promise<boolean> {
    return MSocket.get<string, boolean>('setUsername', newusername)
  }

  getTopWins (limit: number, page = 0): Promise<ApiTopWinsUser[]> {
    return MSocket.get<{limit: number, page?: number}, ApiTopWinsUser[]>('topWins', { limit, page })
  }

  getTopWordSpeed (limit: number, page = 0): Promise<ApiTopWordSpeed[]> {
    return MSocket.get<{limit: number, page?: number}, ApiTopWordSpeed[]>('topWordSpeeds', { limit, page })
  }

  muteUser (userid: string, duration: string): Promise<boolean> {
    return MSocket.get<{userid: string, duration: string}, boolean>('muteUser', { userid, duration })
  }
}

const Api = new ApiClass()
export default Api
