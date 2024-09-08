import { App, Plugin } from 'vue'
import './style.scss'

import { GoogleMap, GoogleMapLoader } from './components'

declare module 'vue' {
  export interface GlobalComponents {
    GoogleMap: typeof GoogleMap
    GoogleMapLoader: typeof GoogleMapLoader
  }
}

export const createVue3GmapsPlugin: Plugin = {
  install: (app: App) => {
    app.component('GoogleMap', GoogleMap)
    app.component('GoogleMapLoader', GoogleMapLoader)

    return { GoogleMap, GoogleMapLoader }
  },
  // GoogleMap,
  // GoogleMapLoader,
}

export { GoogleMap, GoogleMapLoader }
