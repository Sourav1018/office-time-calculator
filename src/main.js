import './assets/main.css'

import { createApp } from 'vue'
import pinia from './stores'

import App from './App.vue'
import router from './router'

if ('serviceWorker' in navigator) {
  window.addEventListener('load',()=>{
    navigator.serviceWorker
    .register('/office-time-calculator/service-worker.js')
    .then((registration) => {
      console.log('ServiceWorker registration successful')
    })
    .catch((err) => {
      console.log('ServiceWorker registration failed: ', err)
    })
  })
}

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
