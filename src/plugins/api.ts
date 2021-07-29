import Api from '@/api/Api'
import Game from '@/api/Game'
import MSocket from '@/api/socket'
import { App } from 'vue'

export default {
  install: (app: App<Element>): void => {
    app.config.globalProperties.$socket = MSocket
    app.config.globalProperties.$api = Api
    app.config.globalProperties.$game = Game
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $socket: typeof MSocket
    $api: typeof Api
    $game: typeof Game
  }
}
