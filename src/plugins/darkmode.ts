import { App } from 'vue'
import {
  enable as enableDarkMode,
  disable as disableDarkMode
} from 'darkreader'
import Rav from '@/classes/Rav'
import Listener from '@/classes/Listener'

const dmevent = new Listener<boolean>()
const gdarkmode = new Rav(localStorage.darkmode === 'true', (n) => {
  dmevent.emit(n)

  updateMode()
})
updateMode()

function updateMode () {
  localStorage.darkmode = gdarkmode.value ? 'true' : 'false'
  if (gdarkmode.value) {
    enableDarkMode({
      brightness: 100,
      contrast: 90,
      sepia: 10
    })
  } else {
    disableDarkMode()
  }
}

export default {
  install: (app: App<Element>): void => {
    app.mixin({
      data () {
        return {
          darkmode: gdarkmode.value
        }
      },
      created () {
        dmevent.addEventListener((d) => {
          this.darkmode = d
        })
      },
      watch: {
        darkmode: {
          handler () {
            gdarkmode.value = this.darkmode
          }
        }
      }
    })
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    darkmode: boolean
  }
}
