<template>
  <div class="google-map-loader">
    <div
      ref="mapContainer"
      class="map-container"
      style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
    >
      <slot>{{ errorText }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader, LoaderOptions } from '@googlemaps/js-api-loader'
import { ref } from 'vue'

import { IGoogleMapLoaderProps } from './index'

const props = defineProps<IGoogleMapLoaderProps>()

const loader = new Loader(props.loaderOptions as LoaderOptions)
const errorText = ref<string>('')

const mapContainer = ref()
let map: google.maps.Map

loader
  .importLibrary('maps')
  .then(async ({ Map }) => {
    errorText.value = ''
    map = new Map(mapContainer.value, props.mapOptions)
    console.log('map', map)
  })
  .catch((e) => {
    errorText.value = 'Could not load Google map'
    console.log(e)
  })
</script>
