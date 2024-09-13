import { createApp } from 'vue'
import App from './App.vue'
import createVue3GmapsPlugin from './src'
import { IMapOptions } from './src/types'

const mapOptions: IMapOptions = {
  center: {
    lat: 61.96685,
    lng: 96.62759,
  },
  zoom: 4,
  mapId: 'TEST',
  mapTypeId: 'hybrid',
}

createApp(App)
  .use(createVue3GmapsPlugin, { mapOptions })
  .mount('#app')
