import Listener from '@/classes/Listener'
import { Ref, ref } from 'vue'
import MSocket from './socket'

class GameClass {
  id: Ref<string> = ref('')
  users: Ref<{
    id: string
    points: number
    username: string
  }[]> = ref([])

  streak: Ref<number> = ref(0)
  streakUser: Ref<string|undefined> = ref(undefined)
  question: Ref<string> = ref('')
  wordcount: Ref<number> = ref(0)
  waiting: Ref<boolean> = ref(true)

  inGame: Ref<boolean> = ref(false)

  onChat = new Listener<{ userid: string, text: string, username: string }>()
  onSuccess = new Listener<{ userid: string, word: string, time: number, username: string }>()
  onWon = new Listener<{ id: string; points: number; username: string }[]>()
  onJoinMessage = new Listener<{id: string, username: string}>()
  onLeaveMessage = new Listener<{id: string, username: string}>()

  setup (): void {
    // reset variables if not first time
    this.streak.value = 0
    this.streakUser.value = undefined
    this.question.value = ''
    this.wordcount.value = 0
    this.waiting.value = true

    this.inGame.value = false

    // setup listeners
    MSocket.socket.on('game.chat', (msg: { userid: string, text: string, username: string }) => {
      this.onChat.emit(msg)
    })

    MSocket.socket.on('game.success', (data: { userid: string, word: string, time: number, username: string }) => {
      this.onSuccess.emit(data)
    })

    MSocket.socket.on('game.update', (data: { id?: string, users?: { id: string, points: number, username: string }[], streak?: number, streakUser?: string, question?: string, wordcount?: number, waiting?: boolean }) => {
      this.id.value = data.id || this.id.value
      this.users.value = data.users || this.users.value
      this.streak.value = data.streak || this.streak.value
      this.streakUser.value = data.streakUser || this.streakUser.value
      this.question.value = data.question || this.question.value
      this.wordcount.value = data.wordcount || this.wordcount.value
      this.waiting.value = data.waiting || this.waiting.value
    })

    MSocket.socket.on('game.won', (wonusers: { id: string; points: number; username: string }[]) => {
      this.onWon.emit(wonusers)
    })

    MSocket.socket.on('game.joinMessage', (e: {id: string, username: string}) => {
      this.onJoinMessage.emit(e)
    })

    MSocket.socket.on('game.leaveMessage', (e: {id: string, username: string}) => {
      this.onLeaveMessage.emit(e)
    })
  }

  async autoJoinGame (): Promise<boolean> {
    const ok = await MSocket.get<string, boolean>('game.autoJoin', '')
    if (ok === true) {
      this.inGame.value = true
    }
    return ok
  }

  async joinGame (gameid: string): Promise<boolean> {
    const ok = await MSocket.get<string, boolean>('game.join', gameid)
    if (ok === true) {
      this.inGame.value = true
    }
    return ok
  }

  async leaveGame (): Promise<boolean> {
    const ok = await MSocket.get<string, boolean>('game.leave', '')
    if (ok === true) {
      this.inGame.value = false
    }
    return ok
  }
}

const Game = new GameClass()
export default Game
