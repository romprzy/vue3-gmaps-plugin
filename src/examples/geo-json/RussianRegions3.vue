<template>
  <div style="position: relative; width: 100%; display: flex; overflow: hidden;">
    <div style="position: relative; flex-basis: 75%; height: 100%;">
      <GoogleMapLoader @set:map="setMap" />
    </div>
    <div style="color: #fff; height: 90vh; overflow: auto;">
      <div class="error-text" style="padding: 0 1em; margin-bottom: .5em;">{{ boundsLoadingError }}</div>
      <div style="padding: 0 1em;"><button style="display: block; padding: .2em 1em;" @click="setGeoJson">Load Bounds</button></div>
      <div style="padding: .25em 1em;">Current: <strong>{{ selected?.name }}</strong></div>
      <div style="padding: 0 1em;"><button style="display: block; padding: .2em 1em;" @click="fitBounds(map, geoData)">fitBounds</button></div>

      <template v-if="items">
        <RussianRegions3List
          :items="items"
          @click:item="toggleActiveItem($event.id)"
          @mouseenter:item="toggleSelectedItem($event.id)"
          @mouseleave:item="toggleSelectedItem($event.id, false)"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RussianRegions3List from './RussianRegions3List.vue'
import { Feature } from 'geojson'
import { defaultStyle, selectedStyleOverride, hoverStyleOverride } from '@/options'
import { IWMGeoLabGeoBoundaries } from '@/types/WMGeoLab.js'
import { fitBounds, prepareWMGeoLabGeoJson } from '@/helpers'


const items = ref()
const mapLoading = ref<boolean>(true)
const map = ref()
const geoData = ref()

const boundsLoading = ref<boolean>()
const boundsLoadingError = ref()
const geoJsonUrl = '/public/geoBoundaries-RUS-ADM1_simplified.geojson?url'
let geoJson: IWMGeoLabGeoBoundaries
const getGeoJson = async(url: string | URL) => {
  boundsLoading.value = true
  geoJson = await fetch(url)
    .then(response => response.json())
    .catch(e => {
      console.error(e)
      boundsLoadingError.value = e
    })
    .finally(() => {
      boundsLoading.value = false
    })
}

const toggleActiveItem = (id: string | number) => {
  const feature = geoData.value.getFeatureById(id)
  feature.setProperty('active', !feature.getProperty('active'))
  const listItem = items.value?.find((item: Feature) => id === item.id)
  listItem.active = feature.getProperty('active')
}
const toggleSelectedItem = (id: string | number, value: boolean = true) => {
  const feature = geoData.value.getFeatureById(id)
  feature.setProperty('selected', value)
  const listItem = items.value.find((item: Feature) => id === item.id)
  listItem.selected = value
  selected.value = listItem
}

const selected = ref()

const setMap = (loadedMap: google.maps.Map) => {
  map.value = loadedMap
  mapLoading.value = false
}

const setGeoDataListeners = (geoData: google.maps.Data) => {
  geoData.setStyle((feature) => ({
    ...defaultStyle,
    ...(feature.getProperty('active') && (selectedStyleOverride || {})),
    ...(feature.getProperty('selected') && (hoverStyleOverride || {})),
  }))

  geoData.addListener('click', (event: any) => {
    const feature = event.feature
    if (feature) {
      const id = feature.getId()
      toggleActiveItem(id)
    }
  })

  geoData.addListener('mouseover', (event: any) => {
    // geoData.revertStyle()
    const feature = event.feature
    if (feature) {
      const id = feature.getId()
      toggleSelectedItem(id)
    }
  })

  geoData.addListener('mouseout', (event: any) => {
    // geoData.revertStyle()
    const feature = event.feature
    if (feature) {
      const id = feature.getId()
      toggleSelectedItem(id, false)
    }
  })
}

const setGeoJson = async() => {
  await getGeoJson(geoJsonUrl)
  items.value = prepareWMGeoLabGeoJson(geoJson)

  geoData.value = new google.maps.Data({ map: map.value })
  geoData.value.addGeoJson(geoJson)

  fitBounds(map.value, geoData.value)
  setGeoDataListeners(geoData.value)
}
</script>

