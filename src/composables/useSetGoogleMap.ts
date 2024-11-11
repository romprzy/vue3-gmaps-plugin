import { ref, shallowRef } from 'vue'

export const useSetGoogleMap = (callback?: Function) => {
  const mapLoading = ref<boolean>(true)
  const map = shallowRef<google.maps.Map>()
  const setMap = (loadedMap: google.maps.Map) => {
    map.value = loadedMap
    mapLoading.value = false

    if (callback) callback()
  }

  return {
    mapLoading,
    map,
    setMap,
  }
}
