import { App, Plugin } from 'vue'
import './style.scss'
import { GoogleMapLoader } from './components'
import { Vue3GmapsPluginOptions } from './types/Vue3GmapsPluginOptions.ts'
import { LoaderOptions } from '@googlemaps/js-api-loader'

import {
  useGetGeoJson,
  useSetGeoDataStyles,
  useCalculateGMLOptions,
  useSetGeoDataEvents,
  useSetGoogleMap,
} from './composables'

const loaderOptions: Partial<LoaderOptions> = {
  version: 'weekly',
  libraries: [],
}

const createVue3GmapsPlugin: Plugin = {
  install: (app: App, options: Vue3GmapsPluginOptions = { apiKey: '', loaderOptions }) => {
    app.component('GoogleMapLoader', GoogleMapLoader)

    app.use(useSetGoogleMap)

    app.provide('apiKey', options.apiKey)
    app.provide('errorText', options.errorText)
    app.provide('loaderOptions', options.loaderOptions)
    app.provide('mapOptions', options.mapOptions)
  },
}

export default createVue3GmapsPlugin
export {
  GoogleMapLoader,
  useGetGeoJson,
  useSetGeoDataStyles,
  useCalculateGMLOptions,
  useSetGeoDataEvents,
  useSetGoogleMap,
}
