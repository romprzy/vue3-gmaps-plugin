import { LoaderOptions } from '@googlemaps/js-api-loader'
import MapOptions = google.maps.MapOptions

export interface IGoogleMapLoaderProps {
  loaderOptions?: Partial<LoaderOptions>
  mapOptions?: MapOptions
}
