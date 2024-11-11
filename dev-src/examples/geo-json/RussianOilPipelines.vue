<template>
  <GoogleMapLoader
    :map-options="{ center: {lat: 49.67728, lng: 25.924365}, zoom: 3 }"
    @set:map="setMap"
  />
</template>

<script setup lang="ts">
// import oilSample from './RussianOilSample.json'
import { ref } from 'vue'

const hover = ref()
import oilSample from '../../../data/oil-pipelines.geo.json'
const setMap = async (map) => {
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary
  //
  const data = new google.maps.Data({ map })
  data.addGeoJson(oilSample)

  data.setStyle({
    strokeColor: 'red',
    strokeWeight: 1,
  })

  const items = []

  data.addListener('mouseover', event => {
    console.log(event.feature.Hg)
    const id = event.feature?.Hg || event.feature?.Fg?.id
    hover.value = event.feature.Fg

    const elements = document.querySelectorAll('.region')
    elements.forEach(element => {
      element.style.opacity = 0
    })

    // const element = document.querySelector(`.region-${id}`)
    // element.style.opacity = 1
  })
  data.addListener('mouseleave', event => {
    const elements = document.querySelectorAll('.region')
    elements.forEach(element => {
      element.style.opacity = 0
    })
  })

  data.forEach(item => {
    const name = item.Fg?.project
    const id = item.id || item.Fg?.id

    items.push(id)

    let latMin: number
    let latMax: number
    let lngMin: number
    let lngMax: number

    item?.Eg?.forEachLatLng(coords => {
      const lat = coords.lat()
      const lng = coords.lng()
      if (latMin === undefined || latMin > lat) latMin = lat
      if (latMax === undefined || latMax < lat) latMax = lat
      if (lngMin === undefined || lngMin > lng) lngMin = lng
      if (lngMax === undefined || lngMax < lng) lngMax = lng
    })

    const lat = (latMax + latMin) / 2
    const lng = (lngMax + lngMin) / 2

    const center = { lat, lng }

    const content = document.createElement('div')
    content.classList.add(`region-${id}`)
    content.classList.add('region')
    content.style.backgroundColor = 'rgba(0, 0, 0, .7)'
    content.style.color = 'white'
    content.style.opacity = 0
    content.innerHTML = id

    new AdvancedMarkerElement({
      map,
      position: center,
      content,
    })
    // const array = item.getArray()

    // console.log(id, geometry, geometry?.Eg?.[0]?.Eg, geo)
    // console.log('array', array)
  })
}
</script>
