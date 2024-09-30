import { App, Plugin } from 'vue'
import './style.scss'
import { Vue3GmapsPluginOptions } from './types/Vue3GmapsPluginOptions.ts'
import { LoaderOptions } from '@googlemaps/js-api-loader'
import components from '@/components'
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
    if (options.components) {
      for (const name of Object.keys(options.components)) {
        app.component(name, options.components[name])
      }
    }

    app.provide('components', options.components)
    app.provide('apiKey', options.apiKey)
    app.provide('errorText', options.errorText)
    app.provide('loaderOptions', options.loaderOptions)
    app.provide('mapOptions', options.mapOptions)
  },
}

export default createVue3GmapsPlugin
export {
  components,
  useGetGeoJson,
  useSetGeoDataStyles,
  useCalculateGMLOptions,
  useSetGeoDataEvents,
  useSetGoogleMap,
}
