import { App, Plugin } from 'vue'
import { GoogleMap, GoogleMapLoader } from './components'
import './style.scss'

const Vue3GmapsPlugin: Plugin = (app: App) => {
  app.component('GoogleMap', GoogleMap)
  app.component('GoogleMapLoader', GoogleMapLoader)
}
export default Vue3GmapsPlugin
