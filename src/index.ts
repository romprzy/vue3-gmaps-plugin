import { App, Plugin } from 'vue'
import './style.scss'
import * as components from './components'
import * as composables from './composables'

import { Vue3GmapsPluginOptions } from './types/Vue3GmapsPluginOptions.ts'
import { LoaderOptions } from '@googlemaps/js-api-loader'

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
    if (options.composables) {
      for (const name of Object.keys(options.composables)) {
        app.use(options.composables[name])
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
  composables,
}
