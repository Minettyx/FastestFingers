import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

/* my plugins */
import functions from '@/plugins/functions'
import viewport from '@/plugins/viewport'
import darkmode from '@/plugins/darkmode'
import auth from '@/plugins/auth'

/* google auth */
import GAuth from 'vue3-google-oauth2'

/* toaster */
import Toaster from '@incuca/vue3-toaster'

/* API initialization */
import api from './plugins/api'

const app = createApp(App)
app.use(router)

app.use(functions)
app.use(viewport)
app.use(darkmode)
app.use(auth)

app.use(api)

const gAuthOptions = {
  clientId: '460731705619-f1sf2c9mq0lhk0onoqt2hc4o8f22gn6t.apps.googleusercontent.com',
  prompt: 'consent',
  access_type: 'offline'
}
app.use(GAuth, gAuthOptions)

app.use(Toaster)

app.mount('#app')
