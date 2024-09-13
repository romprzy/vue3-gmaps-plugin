<template>
  <GoogleMapLoader
    @set:map="setMap"
  />
</template>

<script setup lang="ts">
import items from './markers'
const markers = items.filter(({ lat, lng }) => lat && lng)
const setMap = async (map) => {
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary
  markers?.forEach(marker => {
    // const content = document.createElement('div')
    // content.className = 'marker-content'
    // content.innerHTML = marker.name

    new AdvancedMarkerElement({
      map,
      position: marker,
      title: marker.refinery,
      // content,
    })
  })
}
</script>
