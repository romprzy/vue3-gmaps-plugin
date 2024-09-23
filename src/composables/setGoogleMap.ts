import { ref } from 'vue'

export const useSetGoogleMap = () => {
  const mapLoading = ref<boolean>(true)
  const map = ref()
  const setMap = (loadedMap: google.maps.Map) => {
    map.value = loadedMap
    mapLoading.value = false
  }

  return {
    mapLoading,
    map,
    setMap,
  }
}
