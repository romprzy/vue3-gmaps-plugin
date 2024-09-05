import { App, Plugin } from 'vue'
import { GoogleMap, GoogleMapLoader } from './components'

const Vue3GmapsPlugin: Plugin = {
  install(app: App) {
    app.component('GoogleMap', GoogleMap)
    app.component('GoogleMapLoader', GoogleMapLoader)
  },
}
export default Vue3GmapsPlugin
