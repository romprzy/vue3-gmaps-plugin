<template>
  <div style="position: relative; width: 100%; display: flex; overflow: hidden;">
    <div style="position: relative; flex-basis: 75%; height: 100%;">
      <GoogleMapLoader @set:map="setMap" />
    </div>
    <div style="color: #fff; height: 90vh; overflow: auto;">
      <div class="error-text" style="padding: 0 1em; margin-bottom: .5em;">{{ geoJsonLoadingError }}</div>
      <div style="padding: 0 1em;">
        <v-btn
          :loading="geoJsonLoading"
          style="display: block; padding: .2em 1em;"
          @click="setGeoJson(geoJsonUrl)"
        >Load Bounds</v-btn>
      </div>
      <div style="padding: 0 1em;">
        <v-btn
          :disabled="!geoData"
          style="display: block; padding: .2em 1em;"
          @click="clearEvents"
        >Clear events</v-btn>
      </div>
      <div style="padding: .25em 1em;">Current: <strong>{{ hover?.name }}</strong></div>
      <div style="padding: 0 1em;"><button style="display: block; padding: .2em 1em;" @click="fitBounds(map, geoData)">fitBounds</button></div>

      <template v-if="items">
        <FeaturesList
          :items="items"
          @click:item="toggleActiveItem($event.id, geoData, items)"
          @mouseenter:item="toggleHoverItem($event.id, geoData, items)"
          @mouseleave:item="toggleHoverItem($event.id, geoData, items, false)"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import FeaturesList from '@/components/FeaturesList/FeaturesList.vue'
import { IWMGeoLabGeoBoundaries } from '@/types/WMGeoLab'
import { fitBounds, prepareWMGeoLabGeoJson } from '@/helpers'
import { useGetGeoJson } from '@/composables/useGetGeoJson'
import { useSetGeoDataEvents } from '@/composables/useSetGeoDataEvents'
import { useSetGeoDataStyles } from '@/composables/useSetGeoDataStyles'
import { useSetGoogleMap } from '@/composables/useSetGoogleMap'

const items = ref()
const geoData = ref()

const geoJsonUrl = '/data/geoBoundaries-RUS-ADM1_simplified.geojson?url'
let clearEvents = () => {}

const {
  geoJsonLoading,
  geoJsonLoadingError,
  getGeoJson,
} = useGetGeoJson()

const {
  toggleActiveItem,
  hover,
  toggleHoverItem,
  setGeoDataListeners,
} = useSetGeoDataEvents()

const { setGeoDataStyles } = useSetGeoDataStyles()

const {
  map,
  setMap,
} = useSetGoogleMap()

const setGeoJson = async(geoJsonUrl) => {
  let geoJson: IWMGeoLabGeoBoundaries | {} = await getGeoJson(geoJsonUrl)
  items.value = prepareWMGeoLabGeoJson(geoJson)

  geoData.value = new google.maps.Data({ map: map.value })
  geoData.value.addGeoJson(geoJson)

  setGeoDataStyles(geoData.value, { keys: ['active', 'hover'] })

  fitBounds(map.value, geoData.value)

  const { clearListeners } = setGeoDataListeners(geoData.value, items.value)
  clearEvents = clearListeners
  geoJson = {}
}

onBeforeUnmount(() => {
  clearEvents()
})
</script>

