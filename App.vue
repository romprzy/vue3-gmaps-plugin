<template>
  <div>Vue 3 Gmaps Plugin</div>
  <GoogleMapLoader
    :loader-options="loaderOptions"
    :map-options="mapOptions"
  />
</template>

<script setup lang="ts">
import { LoaderOptions } from '@googlemaps/js-api-loader'

const loaderOptions: Partial<LoaderOptions> = {
  version: 'weekly',
  libraries: ['places'],
}

const mapOptions = {
  center: {
    lat: 0,
    lng: 0,
  },
  zoom: 6,
}
</script>
