<template>
  <div class="google-map-loader">
    <div
      ref="mapContainer"
      class="map-container"
      style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
    >
      <slot>{{ errorTextValue }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader, LoaderOptions } from '@googlemaps/js-api-loader'
import { ref } from 'vue'
import { IGoogleMapLoaderProps } from './'

const props = defineProps<IGoogleMapLoaderProps>()

const loader = new Loader(props.loaderOptions as LoaderOptions)
const errorTextValue = ref<string>(props.errorText)

const mapContainer = ref()
let map: google.maps.Map

loader
  .importLibrary('maps')
  .then(async ({ Map }) => {
    errorTextValue.value = ''
    map = new Map(mapContainer.value, props.mapOptions)
    console.log('map', map)
  })
  .catch((e) => {
    errorTextValue.value = props.errorText
    console.log(e)
  })
</script>
