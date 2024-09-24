<template>
  <v-container class="d-flex flex-column flex-grow-1 overflow-hidden" fluid>
    <v-row class="overflow-hidden">
      <v-col
        class="d-flex flex-column pa-0 flex-grow-1"
        cols="12"
        lg="8"
      >
        <v-toolbar density="compact">
          <v-toolbar-title>Title</v-toolbar-title>
          <v-toolbar-items>
            <v-btn>Load refineries</v-btn>
            <v-divider vertical />
            <v-btn
              :class="{'bg-error': boundsLoadingError, 'bg-info': boundsLoading, 'bg-success': boundsJson}"
              :loading="boundsLoading"
              @click="setBoundsGeoData(boundsUrl)"
            >
              <template #prepend>
                <v-icon
                  :icon="(boundsJson && 'mdi-check') || (boundsLoading && 'mdi-reload') || (boundsLoadingError && 'mdi-exclamation') || 'mdi-help'"
                  size="12"
                />
              </template>
              Load boundaries
            </v-btn>
            <v-divider vertical />
            <v-btn @click="clearBounds">clearBounds</v-btn>
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
        <div class="flex-grow-1 position-relative">
          <GoogleMapLoader class="flex-grow-1" @set:map="setMap" />
        </div>
      </v-col>

      <v-col
        class="overflow-y-auto h-100"
        cols="12"
        lg="4"
      >
        <FeaturesList
          v-if="boundsItems"
          :items="boundsItems"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSetGoogleMap } from '@/composables/setGoogleMap'
import { useGetGeoJson } from '@/composables/getGeoJson'
import { IWMGeoLabGeoBoundaries } from '@/types'
import { fitBounds, prepareWMGeoLabGeoJson } from '@/helpers'
import { useSetGeoDataStyles } from '@/composables/setGeoDataStyles'
import FeaturesList from '@/components/FeaturesList/FeaturesList.vue'
const mapType = ref('roadmap')

const boundsUrl = '/public/geoBoundaries-RUS-ADM1_simplified.geojson?url'

const {
  map,
  setMap,
} = useSetGoogleMap()

const {
  geoJsonLoading: boundsLoading,
  geoJsonLoadingError: boundsLoadingError,
  getGeoJson: getBounds,
} = useGetGeoJson(boundsUrl)

const { setGeoDataStyles } = useSetGeoDataStyles()

const boundsData = ref()
const boundsJson = ref<IWMGeoLabGeoBoundaries>()
const boundsItems = ref()

const setBoundsGeoData = async() => {
  boundsLoading.value = true
  boundsJson.value = await getBounds()

  if (boundsJson.value) {
    boundsItems.value = prepareWMGeoLabGeoJson(boundsJson.value)
    boundsData.value = new google.maps.Data({ map: map.value })
    boundsData.value.addGeoJson(boundsJson.value)
    setGeoDataStyles(boundsData.value)
    fitBounds(map.value, boundsData.value)
  }
}

const clearBounds = () => {
  if (boundsData.value) {
    boundsData.value.forEach(feature => {
      boundsData.value.remove(feature)
    })

    boundsData.value = undefined
    boundsJson.value = undefined
    boundsItems.value = undefined
    boundsLoading.value = undefined
    boundsLoadingError.value = undefined
  }
}
</script>
