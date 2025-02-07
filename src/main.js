import './assets/main.css'

import { createApp } from 'vue'
import pinia from './stores'

import App from './App.vue'
import router from './router'
import { boot } from './bootloader/boot'

const app = createApp(App)
boot.load().initialize(app)
app.use(pinia)
app.use(router)

app.mount('#app')
