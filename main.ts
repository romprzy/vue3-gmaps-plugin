import { createApp } from 'vue'
import App from './App.vue'
import createVue3GmapsPlugin from './src'

createApp(App)
  .use(createVue3GmapsPlugin, { apiKey: '' })
  .mount('#app')
