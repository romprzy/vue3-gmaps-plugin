import { ref } from 'vue'
import { IWMGeoLabGeoBoundaries } from '@/types'

export const useGetGeoJson = (url: string | URL) => {
  const geoJsonLoading = ref<boolean>()
  const geoJsonLoadingError = ref()

  const getGeoJson = async(getGeoJsonUrl?: string | URL) => {
    geoJsonLoading.value = true
    geoJsonLoadingError.value = undefined

    const geoJson: IWMGeoLabGeoBoundaries = await fetch(getGeoJsonUrl || url)
      .then(response => response.json())
      .catch(e => {
        console.error('Bounds loading error')
        console.error(e)
        geoJsonLoadingError.value = e
      })
      .finally(() => {
        geoJsonLoading.value = false
      })
    const features = geoJson.features
    //   .filter(({ properties }) => !properties
    //     .country
    //     .split(',')
    //     .includes('United States'))
    // console.log(features)
    geoJson.features = features

    return geoJsonLoadingError.value ? undefined : geoJson
  }

  return {
    geoJsonLoading,
    geoJsonLoadingError,
    getGeoJson,
  }
}
