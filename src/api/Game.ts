import { Socket } from 'socket.io-client'
import { Ref, ref } from 'vue'

export default class Game {
  private socket
  id: Ref<string> = ref('')
  users: Ref<{
    id: string
    points: number
  }[]> = ref([])

  streak: Ref<number> = ref(0)
  streakUser: Ref<string|undefined> = ref(undefined)
  question: Ref<string> = ref('')
  wordcount: Ref<number> = ref(0)
  waiting: Ref<boolean> = ref(true)

  private onChatFunc?: (msg: { userid: string, text: string, username: string }) => void
  onChat (func: (msg: { userid: string, text: string, username: string }) => void): void {
    this.onChatFunc = func
  }

  private onSuccessFunc?: (data: { userid: string, word: string, time: number, username: string }) => void
  onSuccess (func: (data: { userid: string, word: string, time: number, username: string }) => void): void {
    this.onSuccessFunc = func
  }

  private onWonFunc?: (wonusers: { id: string; points: number; username: string }[]) => void
  onWon (func: (wonusers: { id: string; points: number; username: string }[]) => void): void {
    this.onWonFunc = func
  }

  private onJoinMessageFunc?: (e: {id: string, username: string}) => void
  onJoinMessage (func: (e: {id: string, username: string}) => void): void {
    this.onJoinMessageFunc = func
  }

  private onLeaveMessageFunc?: (e: {id: string, username: string}) => void
  onLeaveMessage (func: (e: {id: string, username: string}) => void): void {
    this.onLeaveMessageFunc = func
  }

  constructor (socket: Socket) {
    this.socket = socket

    socket.on('game.updateQuestion', (q: string) => {
      this.question.value = q
    })

    socket.on('game.updateWaiting', (waiting: boolean) => {
      this.waiting.value = waiting
    })

    socket.on('game.chat', (msg: { userid: string, text: string, username: string }) => {
      this.onChatFunc && this.onChatFunc(msg)
    })

    socket.on('game.success', (data: { userid: string, word: string, time: number, username: string }) => {
      this.onSuccessFunc && this.onSuccessFunc(data)
    })

    socket.on('game.updateInfo', (data: { id: string, users: { id: string, points: number, username?: string }[], streak: number, streakUser?: string, question: string, wordcount: number, waiting: boolean }) => {
      this.id.value = data.id
      this.users.value = data.users
      this.streak.value = data.streak
      this.streakUser.value = data.streakUser
      this.question.value = data.question
      this.wordcount.value = data.wordcount
      this.waiting.value = data.waiting
    })

    socket.on('game.won', (wonusers: { id: string; points: number; username: string }[]) => {
      this.onWonFunc && this.onWonFunc(wonusers)
    })

    socket.on('game.joinMessage', (e: {id: string, username: string}) => {
      this.onJoinMessageFunc && this.onJoinMessageFunc(e)
    })

    socket.on('game.leaveMessage', (e: {id: string, username: string}) => {
      this.onLeaveMessageFunc && this.onLeaveMessageFunc(e)
    })
  }
}
