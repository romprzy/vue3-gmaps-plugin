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
import { ref, inject } from 'vue'
import { IGoogleMapLoaderProps } from './'
import MapOptions = google.maps.MapOptions

const props = withDefaults(defineProps<IGoogleMapLoaderProps>(), {
  errorText: '',
})

const emits = defineEmits(['set:map'])

const injectedErrorText = inject<string | undefined>('errorText')
const injectedApiKey = inject<string>('apiKey')
const injectedLoaderOptions = inject<Partial<LoaderOptions>>('loaderOptions')
const injectedMapOptions = inject<Partial<MapOptions>>('mapOptions')

const errorTextValue = ref<string>(injectedErrorText || props.errorText || '')
const apiKey: string = props.loaderOptions?.apiKey || injectedApiKey || injectedLoaderOptions?.apiKey || ''
const mapOptions: Partial<MapOptions> = {
  ...injectedMapOptions,
  ...props.mapOptions,
}

const loaderOptions: LoaderOptions = {
  ...props.loaderOptions,
  ...injectedLoaderOptions,
  apiKey,
}

const loader = new Loader(loaderOptions)

const mapContainer = ref()
let map: google.maps.Map

loader
  .importLibrary('maps')
  .then(async ({ Map }) => {
    errorTextValue.value = ''
    map = new Map(mapContainer.value, mapOptions)

    emits('set:map', map)
  })
  .catch((e) => {
    errorTextValue.value = props.errorText
    console.log(e)
  })
</script>
