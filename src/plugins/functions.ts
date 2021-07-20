import { App } from 'vue'

export class Utils {
  static timeSince (date: Date | string | number): string {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)

    let interval = seconds / 31536000

    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + ' year'
      } else {
        return Math.floor(interval) + ' years'
      }
    }
    interval = seconds / 2592000
    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + ' month'
      } else {
        return Math.floor(interval) + ' months'
      }
    }
    interval = seconds / 86400
    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + ' day'
      } else {
        return Math.floor(interval) + ' days'
      }
    }
    interval = seconds / 3600
    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + ' hour'
      } else {
        return Math.floor(interval) + ' hours'
      }
    }
    interval = seconds / 60
    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + ' minute'
      } else {
        return Math.floor(interval) + ' minutes'
      }
    }
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + ' second'
    } else {
      return Math.floor(interval) + ' seconds'
    }
  }

  /* https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript */
  static setCookie (name: string, value: string, days: number | false = false): void {
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
  }

  static getCookie (name: string): string | null {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  static eraseCookie (name: string): void {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }
}

export default {
  install: (app: App<Element>): void => {
    /* Calculate the "x ... ago" string from a date */
    app.config.globalProperties.$timeSince = Utils.timeSince
    app.config.globalProperties.$setCookie = Utils.setCookie
    app.config.globalProperties.$getCookie = Utils.getCookie
    app.config.globalProperties.$eraseCookie = Utils.eraseCookie
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $timeSince: (date: Date | string | number) => string
    $setCookie: (name: string, value: string, days: number | false) => void
    $getCookie: (name: string) => string | null
    $eraseCookie: (name: string) => void
    $gAuth: any // eslint-disable-line
    $toast: any // eslint-disable-line
  }
}
