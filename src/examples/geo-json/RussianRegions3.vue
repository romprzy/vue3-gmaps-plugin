<template>
  <div style="position: relative; width: 100%; display: flex; overflow: hidden;">
    <div style="position: relative; flex-basis: 75%; height: 100%;">
      <GoogleMapLoader @set:map="setMap" />
    </div>
    <div style="color: #fff; height: 90vh; overflow: auto;">
      <div class="error-text" style="padding: 0 1em; margin-bottom: .5em;">{{ boundsLoadingError }}</div>
      <div style="padding: 0 1em;"><button style="display: block; padding: .2em 1em;" @click="setGeoJson">Load Bounds</button></div>
      <div style="padding: 0 1em;"><button style="display: block; padding: .2em 1em;" @click="getFeatures()">Get features</button></div>
      <div style="padding: .25em 1em;">Current: <strong>{{ current?.shapeName }}</strong></div>
      <!--      <div style="padding: 0 1em;"><button style="padding: .2em 1em;" @click="getCenter">getCenter</button></div>-->
      <!--      <div style="padding: 0 1em;"><button style="padding: .2em 1em;" @click="getBounds">getBounds</button></div>-->
      <div style="padding: 0 1em;"><button style="display: block; padding: .2em 1em;" @click="fitBounds">fitBounds</button></div>

      <template v-if="items">
        <RussianRegions3List
          :items="items"
          @click:item="toggleItem($event.id)"
          @mouseenter:item="setCurrent"
          @mouseleave:item="setCurrent($event, false)"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import RussianRegions3List from './RussianRegions3List.vue'

const json = ref()
const geoData = ref()
const items = ref()
const mapLoading = ref<boolean>(true)
const boundsLoading = ref<boolean>()
const map = ref()
const boundsLoadingError = ref()

// const items = computed(() => json.value?.features.map(({ properties }) => ({
//   id: properties.id,
//   name: properties.shapeName,
//   iso: properties.shapeISO,
//   active: properties.active,
//   selected: properties.selected,
// })))
const prepareGeoJson = (geoJson) => {
  geoJson.features.forEach(feature => {
    feature.id = feature.properties.shapeID
    feature.properties.id = feature.properties.shapeID
  })

  items.value = geoJson.features.map(({ properties }) => properties)
  //   ({
  //   id: properties.id,
  //   name: properties.shapeName,
  //   iso: properties.shapeISO,
  //   active: properties.active,
  //   selected: properties.selected,
  // }))
}
// const features = computed(() => geoData.value?.getFeatures())

const getCenter = () => {
  const getCenter = map.value.getCenter()
  console.log('getCenter', getCenter.lat(), getCenter.lng())
}

const getFeatures = () => {
  console.log('geoData.getFeatures()', geoData.value)
}
const getBounds = () => {
  const getBounds = map.value.getBounds()
  console.log('getBounds', getBounds)
}
const fitBounds = () => {
  const bounds = new google.maps.LatLngBounds()
  geoData.value.forEach((feature) => {
    feature.getGeometry().forEachLatLng((latLng) => {
      bounds.extend(latLng)
    })
  })

  map.value.fitBounds(bounds, 0)
}
const toggleItem = (id: string | number) => {
  const feature = geoData.value.getFeatureById(id)
  feature.setProperty('active', !feature.getProperty('active'))
  const selected = items.value.find(item => id === item.id)
  selected.active = feature.getProperty('active')
}

const current = ref()
const setCurrent = (item, value: boolean = true) => {
  geoData.value.revertStyle()
  const feature = geoData.value.getFeatureById(item.id)
  feature.setProperty('selected', value)
  current.value = value ? item : undefined
}

const loadGeoJson = async(url) => {
  boundsLoading.value = true
  json.value = await fetch(url)
    .then(response => response.json())
    .catch(e => {
      console.error(e)
      boundsLoadingError.value = e
    })
    .finally(() => {
      boundsLoading.value = false
    })
}
const setMap = (loadedMap: google.maps.Map) => {
  map.value = loadedMap
  mapLoading.value = false
}

const defaultStyle = {
  // clickable: true,
  strokeWeight: 1,
  strokeColor: 'rgba(255, 0, 0, .2)',
  fillOpacity: .05,
  fillColor: 'rgba(255, 0, 0, .35)',
  // label: 'ooo',
}

const selectedStyleOverride = {
  strokeColor: 'rgba(0, 255, 0, .75)',
  fillOpacity: .5,
}

const hoverStyleOverride = {
  strokeWeight: 2,
  fillOpacity: .5,
  fillColor: 'blue',
}

const setGeoJson = async() => {
  await loadGeoJson('/public/geoBoundaries-RUS-ADM1_simplified.geo.json?url')
  prepareGeoJson(json.value)

  geoData.value = new google.maps.Data({ map: map.value })
  geoData.value.addGeoJson(json.value)
  geoData.value.setStyle((feature) => ({
    ...defaultStyle,
    ...(feature.getProperty('active') && (selectedStyleOverride || {})),
    ...(feature.getProperty('selected') && (hoverStyleOverride || {})),
  }))

  geoData.value.addListener('click', (event) => {
    const id = event.feature.getId()
    toggleItem(id)
  })

  geoData.value.addListener('mouseover', (event) => {
    geoData.value.revertStyle()
    event.feature.setProperty('selected', true)
    current.value = event.feature.Fg
  })

  geoData.value.addListener('mouseout', (event) => {
    geoData.value.revertStyle()
    event.feature.setProperty('selected', false)
    current.value = ''
  })

  // const dataItems = []
  // geoData.value.forEach(item => {
  //   // item.setProperty('id', item.Fg.shapeID)
  //   // const id = item.getId()
  //   // console.log('item.Fg', item.Fg)
  //   dataItems.push(item.Fg)
  // })
  // items.value = dataItems

  fitBounds()
}
</script>

