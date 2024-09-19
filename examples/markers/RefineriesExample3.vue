<template>
  <GoogleMapLoader>
    <template #marker="props">
      <BasicMarker
        v-for="marker in markers"
        :key="marker.id"
        v-bind="props"
        :options="{ position: { lat, lng } = marker, title: marker.name }"
        round
        :size="markerSize(marker)"
        @click:marker="clickMarker"
      >
        <template #subtitle>
          <div class="google-maps-marker_subtitle">{{ marker.mTPerYear || '?' }}</div>
        </template>
      </BasicMarker>
    </template>
  </GoogleMapLoader>
</template>

<script setup lang="ts">
import BasicMarker from '@/components/markers/BasicMarker.vue'
import items from './markers.ts'
const markers = items.filter(({ lat, lng }) => lat && lng)

const markerSize = (marker) => 20 * Math.sqrt(marker.mTPerYear || 2)
const clickMarker = ({ $event, markerElement, item }) => {
  console.log('$event', $event)
  console.log('marker', markerElement)
  console.log('item', item)

  markerElement.style.backgroundColor = 'red'
}
</script>
