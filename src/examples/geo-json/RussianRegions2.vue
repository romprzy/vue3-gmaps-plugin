<template>
  <div style="position: relative; width: 100%; display: flex; overflow: hidden;">
    <div style="position: relative; flex-basis: 75%; height: 100%;">
      <GoogleMapLoader @set:map="setMap" />
    </div>
    <div style="color: #fff; height: 90vh; overflow: auto;">
      <div style="padding: .25em 1em;">Current: <strong>{{ current?.shapeName }}</strong></div>
      <!--      <div style="padding: 0 1em;"><button style="padding: .2em 1em;" @click="getCenter">getCenter</button></div>-->
      <!--      <div style="padding: 0 1em;"><button style="padding: .2em 1em;" @click="getBounds">getBounds</button></div>-->
      <div style="padding: 0 1em;"><button style="display: block; padding: .2em 1em;" @click="fitBounds">fitBounds</button></div>

      <template v-if="items">
        <div
          v-for="item in items"
          :key="item.id"
          class="list-item"
          :class="{ current: current?.shapeID === item.id, active: item.active }"
          @click="toggleItem(item.id)"
          @mouseover="setCurrent(item)"
        >
          {{ item.shapeName }} ({{ item.shapeISO }})
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ruJson from './data/geoBoundaries-RUS-ADM1_simplified.geo.json'

ruJson.features.forEach(feature => {
  feature.id = feature.properties.shapeID
})

const geoData = ref()
const items = ref()
let map
const getCenter = () => {
  const getCenter = map.getCenter()
  console.log('getCenter', getCenter.lat(), getCenter.lng())
}
const getBounds = () => {
  const getBounds = map.getBounds()
  console.log('getBounds', getBounds)
}
const fitBounds = () => {
  const bounds = new google.maps.LatLngBounds()
  geoData.value.forEach((feature) => {
    feature.getGeometry().forEachLatLng((latLng) => {
      bounds.extend(latLng)
    })
  })

  map.fitBounds(bounds, 0)
}
const toggleItem = (id) => {
  const feature = geoData.value.getFeatureById(id)
  feature.setProperty('active', !feature.getProperty('active'))
  const selected = items.value.find(item => id === item.id)
  selected.active = feature.getProperty('active')
}

const current = ref()
const setCurrent = (item) => {
  geoData.value.revertStyle()
  const feature = geoData.value.getFeatureById(item.id)
  geoData.value.overrideStyle(feature, { strokeWeight: 2, fillOpacity: .15 })
  current.value = item
}
const setMap = async (loadedMap) => {
  map = loadedMap
  geoData.value = new google.maps.Data({ map })
  geoData.value.addGeoJson(ruJson)
  geoData.value.setStyle((feature) => ({
    // clickable: true,
    strokeWeight: 1,
    strokeColor: feature.getProperty('active') ? 'rgba(0, 255, 0, .75)' : 'rgba(255, 0, 0, .2)',
    fillOpacity: feature.getProperty('active') ? .5 : .05,
    fillColor: 'rgba(255, 0, 0, .35)',
    // label: 'ooo',
  }))

  geoData.value.addListener('click', (event) => {
    const id = event.feature.getId()
    toggleItem(id)
    // event.feature.setProperty('active', !event.feature.getProperty('active'))
    // console.log('feat', event.feature.getProperty('id'))
  })

  geoData.value.addListener('mouseover', (event) => {
    geoData.value.revertStyle()
    geoData.value.overrideStyle(event.feature, { strokeWeight: 2, fillOpacity: .5, fillColor: 'blue' })
    current.value = event.feature.Fg
  })

  geoData.value.addListener('mouseout', (event) => {
    geoData.value.revertStyle()
    current.value = ''
  })

  const dataItems = []
  geoData.value.forEach(item => {
    // item.setProperty('id', item.Fg.shapeID)
    const id = item.getId()
    dataItems.push({ ...item.Fg, id })
  })
  items.value = dataItems

  fitBounds()
}
</script>

<style lang="scss">
.list-item {
  position: relative;
  padding: .35em 2em;
  cursor: pointer;
  border-top: 1px solid transparent;
  border-bottom: 1px solid #000;

  &.current {
    background: rgba(250, 100, 100, .25);
    border-top: 1px dashed rgba(255, 255, 255, .75);
    border-bottom: 1px dashed rgba(255, 255, 255, .75);

    &:before {
      content: '➔';
      position: absolute;
      left: .5em;
    }
  }

  &.active {
    background: rgba(50, 200, 78, .25);
  }
}
</style>
