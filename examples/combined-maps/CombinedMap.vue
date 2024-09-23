<template>
  <v-container class="d-flex flex-column pa-0" fluid>
    <v-row>
      <v-col
        cols="12"
        lg="8"
      >
        <v-toolbar density="compact">
          <v-toolbar-title>Title</v-toolbar-title>
          <v-toolbar-items>
            <v-btn>Load refineries</v-btn>
            <v-divider vertical />
            <v-btn
              :class="{'bg-error': geoJsonLoadingError, 'bg-info': geoJsonLoading, 'bg-success': boundsJson}"
              :loading="geoJsonLoading"
              @click="setBoundaries(boundsUrl)"
            >
              <template #prepend>
                <v-icon
                  :icon="(boundsJson && 'mdi-check') || (geoJsonLoading && 'mdi-reload') || (geoJsonLoadingError && 'mdi-exclamation') || 'mdi-help'"
                  size="12"
                />
              </template>
              Load boundaries
            </v-btn>
            <v-divider vertical />
            <v-btn>Load pipelines</v-btn>
            <v-divider vertical />
            <v-btn>Center map</v-btn>
            <v-divider vertical />
            <v-btn-toggle
              v-model="mapType"
              mandatory
              @update:model-value="map?.setMapTypeId($event)"
            >
              <v-btn value="roadmap">Roadmap</v-btn>
              <v-btn value="satellite">Satellite</v-btn>
              <v-btn value="hybrid">Hybrid</v-btn>
              <v-btn value="terrain">Terrain</v-btn>
            </v-btn-toggle>
          </v-toolbar-items>
        </v-toolbar>
        <GoogleMapLoader @set:map="setMap" />
      </v-col>
      <v-col
        class="flex-grow-1 flex-shrink-0"
        cols="12"
        lg="4"
      >
        ppps
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSetGoogleMap } from '@/composables/setGoogleMap'
import { useGetGeoJson } from '@/composables/getGeoJson'
import { IWMGeoLabGeoBoundaries } from '@/types'
import { fitBounds } from '@/helpers'
import { useSetGeoDataStyles } from '@/composables/setGeoDataStyles'
const mapType = ref('roadmap')

const boundsUrl = '/public/geoBoundaries-RUS-ADM1_simplified.geojson?url'

const {
  map,
  setMap,
} = useSetGoogleMap()

const {
  geoJsonLoading,
  geoJsonLoadingError,
  getGeoJson,
} = useGetGeoJson()

const { setGeoDataStyles } = useSetGeoDataStyles()

const geoData = ref()
const boundsJson = ref<IWMGeoLabGeoBoundaries>()

const setBoundaries = async() => {
  geoJsonLoading.value = true
  boundsJson.value = await getGeoJson(boundsUrl)

  if (boundsJson.value) {
    geoData.value = new google.maps.Data({ map: map.value })
    geoData.value.addGeoJson(boundsJson.value)
    setGeoDataStyles(geoData.value)
    fitBounds(map.value, geoData.value)
  }
}
</script>
