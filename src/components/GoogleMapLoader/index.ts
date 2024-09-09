import { LoaderOptions } from '@googlemaps/js-api-loader'
import MapOptions = google.maps.MapOptions

export interface IGoogleMapLoaderProps {
  errorText?: string
  loaderOptions?: Partial<LoaderOptions>
  mapOptions?: MapOptions
}
