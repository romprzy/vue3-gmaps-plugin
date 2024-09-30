import { Loader, LoaderOptions } from '@googlemaps/js-api-loader'
import MapOptions = google.maps.MapOptions

export interface IGoogleMapMarkerSlotProps {
  advancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement
  google: Loader
  map: google.maps.Map
}

export interface IGoogleMapLoaderProps {
  errorText?: string
  loaderOptions?: Partial<LoaderOptions>
  mapOptions?: MapOptions
}

export interface IGoogleMapLoaderSlots {
  'error-text'(_props: { errorTextValue?: string | undefined }): any
  marker(_props: IGoogleMapMarkerSlotProps): any
}
