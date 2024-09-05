import { createApp } from 'vue'
import './vue3-gmaps-plugin/style.scss'
import App from './App.vue'
import Vue3GmapsPlugin from './vue3-gmaps-plugin/vue3-gmaps-plugin.ts'

createApp(App)
  .use(Vue3GmapsPlugin)
  .mount('#app')
