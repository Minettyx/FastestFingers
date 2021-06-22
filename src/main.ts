import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

/* my plugins */
import functions from './plugins/functions'
import viewport from './plugins/viewport'
import darkmode from './plugins/darkmode'
import socket from './plugins/socket'

/* google auth */
import GAuth from 'vue3-google-oauth2'

const app = createApp(App)
app.use(router)

app.use(functions)
app.use(viewport)
app.use(darkmode)
app.use(socket)

const gAuthOptions = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: 'openid',
  prompt: 'consent',
  fetch_basic_profile: false
}
app.use(GAuth, gAuthOptions)

app.mount('#app')
