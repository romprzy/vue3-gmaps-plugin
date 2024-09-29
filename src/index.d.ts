import { GeoJSON } from 'geojson'
import { Ref } from 'vue'

declare function useGetGeoJson(): {
  geoJsonLoading: Ref<string>
  geoJsonLoadingError: Ref<any>
  getGeoJson(): GeoJSON | undefined
}

declare module 'vue' {
  export interface GlobalComponents {
    GoogleMapLoader: typeof GoogleMapLoader
  }
}
