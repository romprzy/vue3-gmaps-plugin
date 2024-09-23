<template>
  <div class="google-map-loader">
    <div
      ref="mapContainer"
      class="map-container"
      style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
    >
      <slot
        :advancedMarkerElement="advancedMarkerElement"
        :google="loader"
        :map="map"
      >{{ errorTextValue }}</slot>

    </div>
    <template v-if="loaded">
      <slot
        :advancedMarkerElement="advancedMarkerElement"
        :google="loader"
        :map="map"
        name="marker"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import { ref } from 'vue'
import { useCalculateGMLOptions } from '../../composables/calculateGMLOptions.ts'
import { IGoogleMapLoaderProps } from './index.ts'
// import { IGoogleMapLoaderProps, IGoogleMapLoaderSlots } from './'
import AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement

const props = withDefaults(defineProps<IGoogleMapLoaderProps>(), {
  errorText: '',
})

const emits = defineEmits(['set:map', 'loaded'])
// defineSlots<IGoogleMapLoaderSlots>()

const {
  errorTextValue,
  mapOptions,
  loaderOptions,
} = useCalculateGMLOptions(props)

const loader = new Loader(loaderOptions)

const mapContainer = ref()
const loaded = ref<boolean>(false)
let map: google.maps.Map | undefined
const advancedMarkerElement = ref<typeof AdvancedMarkerElement>()

loader
  .importLibrary('maps')
  .then(async ({ Map }) => {
    errorTextValue.value = ''
    map = new Map(mapContainer.value, mapOptions)
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary
    advancedMarkerElement.value = AdvancedMarkerElement
    loaded.value = true
    emits('set:map', map)

    const types = map.mapTypes
    console.log('types', types)
    console.log('map', map)
  })
  .catch((e) => {
    map = undefined
    errorTextValue.value = props.errorText
    console.log(e)
    loaded.value = false
  })
  .finally(() => {
    // emits('loaded', loaded.value)
  })
</script>
