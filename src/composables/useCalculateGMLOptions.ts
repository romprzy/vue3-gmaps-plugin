import { LoaderOptions } from '@googlemaps/js-api-loader'
import { ref, inject } from 'vue'
import MapOptions = google.maps.MapOptions
import { IGoogleMapLoaderProps } from '../components/GoogleMapLoader'

export const useCalculateGMLOptions = (props: IGoogleMapLoaderProps) => {
  const injectedErrorText = inject<string | undefined>('errorText')
  const injectedApiKey = inject<string>('apiKey')
  const injectedLoaderOptions = inject<Partial<LoaderOptions>>('loaderOptions')
  const injectedMapOptions = inject<Partial<MapOptions>>('mapOptions')

  const errorTextValue = ref<string>(injectedErrorText || props.errorText || '')
  const apiKey: string = props.loaderOptions?.apiKey || injectedApiKey || injectedLoaderOptions?.apiKey || ''
  const mapOptions: Partial<MapOptions> = {
    ...injectedMapOptions,
    ...props.mapOptions,
  }

  const loaderOptions: LoaderOptions = {
    ...props.loaderOptions,
    ...injectedLoaderOptions,
    apiKey,
  }

  return {
    errorTextValue,
    mapOptions,
    loaderOptions,
  }
}
