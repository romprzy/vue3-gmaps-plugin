import { IGoogleMapLoaderProps } from '../components/GoogleMapLoader'

export interface Vue3GmapsPluginOptions extends Partial<IGoogleMapLoaderProps> {
  apiKey?: string
  components?: Record<string, any>
  composables?: Record<string, any>
}
