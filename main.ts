import { createApp } from 'vue'
import App from './App.vue'
import createVue3GmapsPlugin from './src'
import { IMapOptions } from './src/types'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
})

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
  .use(vuetify)
  .use(createVue3GmapsPlugin, { mapOptions })
  .mount('#app')
