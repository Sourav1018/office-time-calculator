import './assets/main.css'

import { createApp } from 'vue'
import pinia from './stores'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/office-time-calculator/sw.js')
    .then(() => console.log('Service Worker registered'))
    .catch((err) => console.error('Service Worker error', err))
}
