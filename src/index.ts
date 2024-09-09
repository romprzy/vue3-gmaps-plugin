import { App, Plugin } from 'vue'
import './style.scss'
import { GoogleMap, GoogleMapLoader } from './components'
import { Vue3GmapsPluginOptions } from './types/Vue3GmapsPluginOptions.ts'

declare module 'vue' {
  export interface GlobalComponents {
    GoogleMap: typeof GoogleMap
    GoogleMapLoader: typeof GoogleMapLoader
  }
}

const createVue3GmapsPlugin: Plugin = {
  install: (app: App, options: Vue3GmapsPluginOptions) => {
    app.component('GoogleMap', GoogleMap)
    app.component('GoogleMapLoader', GoogleMapLoader)

    app.provide('apiKey', options.apiKey)
    app.provide('errorText', options.errorText)
    app.provide('loaderOptions', options.loaderOptions)
    app.provide('mapOptions', options.mapOptions)
  },
}

export default createVue3GmapsPlugin
export {
  GoogleMap,
  GoogleMapLoader,
}
