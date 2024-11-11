import { createApp } from 'vue'
import App from './App.vue'
import { router } from './dev-src/routes'
import createVue3GmapsPlugin from './src'
import * as components from './src/components'
import { IMapOptions } from './src/types'
// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as vuetifyComponents from 'vuetify/components'
import * as directives from 'vuetify/directives'
import MapRestriction = google.maps.MapRestriction

const restriction: MapRestriction = {
  latLngBounds: {
    east: 180,
    west: -180,
    north: 85,
    south: -85,
  },
  strictBounds: false,
}

const vuetify = createVuetify({
  components: vuetifyComponents,
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
  restriction,
  zoom: 4,
  mapId: 'TEST',
  mapTypeId: 'hybrid',
  mapTypeControl: true,
  mapTypeControlOptions: {
    mapTypeIds: ['roadmap', 'terrain'],
  },
  colorScheme: 'FOLLOW_SYSTEM',

}

createApp(App)
  .use(router)
  .use(vuetify)
  .use(createVue3GmapsPlugin, { components, mapOptions })
  .mount('#app')
