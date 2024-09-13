<template>
  <GoogleMapLoader @set:map="setMap">
    <template #marker>
      <div
        v-for="marker in markers"
        :key="marker.id"
        ref="markerElements"
        style="color: #fff; background-color: rgba(0,0,0,.5); border-radius: 50%; display: flex; justify-content: center; align-items: center;"
        :style="{width: markerSize(marker), height: markerSize(marker) }"
      >
        <div>
          {{ marker.name }}
        </div>
      </div>
    </template>
  </GoogleMapLoader>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import items from './markers'

const markers = items.filter(({ lat, lng }) => lat && lng)
let map: google.maps.Map
const markerElements = ref()

const markerSize = (marker) => `${20 * Math.sqrt(marker.mTPerYear || 2)}px`
const setMap = async (loadedMap: google.maps.Map) => {
  map = loadedMap

  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary
  markers?.forEach((marker, i) => {
    const content = markerElements.value[i]

    new AdvancedMarkerElement({
      map,
      position: marker,
      title: marker.refinery,
      content,
    })
  })
}
</script>
