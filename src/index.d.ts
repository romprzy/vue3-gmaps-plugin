import { GeoJSON } from 'geojson'
import { Ref } from 'vue'
import { FeaturesList, GoogleMapLoader } from './components'

declare function useGetGeoJson(): {
  geoJsonLoading: Ref<string>
  geoJsonLoadingError: Ref<any>
  getGeoJson(): GeoJSON | undefined
}

declare module 'vue' {
  export interface GlobalComponents {
    GoogleMapLoader: typeof GoogleMapLoader
    FeaturesList: typeof FeaturesList
  }
}
