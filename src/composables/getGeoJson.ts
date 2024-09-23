import { ref } from 'vue'
import { IWMGeoLabGeoBoundaries } from '../types'

export const useGetGeoJson = () => {
  const boundsLoading = ref<boolean>()
  const boundsLoadingError = ref()

  const getGeoJson = async(url: string | URL) => {
    boundsLoading.value = true
    boundsLoadingError.value = undefined

    const geoJson: IWMGeoLabGeoBoundaries = await fetch(url)
      .then(response => response.json())
      .catch(e => {
        console.error('Bounds loading error')
        console.error(e)
        boundsLoadingError.value = e
      })
      .finally(() => {
        boundsLoading.value = false
      })

    return boundsLoadingError.value ? undefined : geoJson
  }

  return {
    boundsLoading,
    boundsLoadingError,
    getGeoJson,
  }
}
