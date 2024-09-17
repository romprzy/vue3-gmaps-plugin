import { createApp } from 'vue'
import App from './App.vue'
import createVue3GmapsPlugin from './src/vue3-gmaps-plugin'
import { IMapOptions } from './src/vue3-gmaps-plugin/types'

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
