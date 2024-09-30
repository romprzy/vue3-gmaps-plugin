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
            <v-btn @click="clearBounds">clearBounds</v-btn>
            <v-divider vertical />
            <v-btn
              :class="{'bg-error': pipelinesLoadingError, 'bg-info': pipelinesLoading, 'bg-success': pipelinesJson}"
              :loading="pipelinesLoading"
              @click="setPipelinesGeoData(pipelinesUrl)"
            >
              <template #prepend>
                <v-icon
                  :icon="(pipelinesJson && 'mdi-check') || (pipelinesLoading && 'mdi-reload') || (pipelinesLoadingError && 'mdi-exclamation') || 'mdi-help'"
                  size="12"
                />
              </template>
              Load pipelines
            </v-btn>
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
import { onBeforeUnmount, ref } from 'vue'
import { IGoogleStyle, IWMGeoLabGeoBoundaries } from '@/types'
import { fitBounds, prepareWMGeoLabGeoJson } from '@/helpers'
import { IUseSetGeoDataStylesOptions, useSetGeoDataStyles } from '@/composables/useSetGeoDataStyles'
import { useTheme } from 'vuetify'
const vTheme = useTheme()
import { useGetGeoJson, useSetGoogleMap } from '@/composables'
const mapType = ref('roadmap')

const boundsUrl = '/data/geoBoundaries-RUS-ADM1_simplified.geojson?url'
const pipelinesUrl = '/data/Oil Infrastructure - map data 2024-06-12_1934.geo.json?url'

const {
  map,
  setMap,
} = useSetGoogleMap()


// boundaries
const {
  geoJsonLoading: boundsLoading,
  geoJsonLoadingError: boundsLoadingError,
  getGeoJson: getBounds,
} = useGetGeoJson(boundsUrl)

const { setGeoDataStyles } = useSetGeoDataStyles()

const boundsData = ref()
const boundsJson = ref<IWMGeoLabGeoBoundaries>()
const boundsItems = ref()

const defaultBoundsStyles: IGoogleStyle = {
  strokeColor: vTheme.current.value.colors.info,
  fillColor: vTheme.current.value.colors.success,
  fillOpacity: .15,
}

const boundsStyleOptions: IUseSetGeoDataStylesOptions = {
  styles: {
    defaultStyle: defaultBoundsStyles,
  },
}

const setBoundsGeoData = async() => {
  boundsLoading.value = true
  boundsJson.value = await getBounds()

  if (boundsJson.value) {
    boundsItems.value = prepareWMGeoLabGeoJson(boundsJson.value)
    boundsData.value = new google.maps.Data({ map: map.value })
    boundsData.value.addGeoJson(boundsJson.value)
    setGeoDataStyles(boundsData.value, boundsStyleOptions)
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

// pipelines
const {
  geoJsonLoading: pipelinesLoading,
  geoJsonLoadingError: pipelinesLoadingError,
  getGeoJson: getPipelines,
} = useGetGeoJson(pipelinesUrl)

const pipelinesData = ref()
const pipelinesJson = ref<IWMGeoLabGeoBoundaries>()
const pipelinesItems = ref()
console.log('vTheme.current.value.colors.success', vTheme.current.value.colors.success)
const defaultPipelinesStyles: IGoogleStyle = {
  strokeColor: 'green',
  fillColor: vTheme.current.value.colors.success,
}

const setPipelinesGeoData = async() => {
  pipelinesLoading.value = true
  pipelinesJson.value = await getPipelines()

  if (pipelinesJson.value) {
    pipelinesItems.value = prepareWMGeoLabGeoJson(pipelinesJson.value)
    pipelinesData.value = new google.maps.Data({ map: map.value })
    pipelinesData.value.addGeoJson(pipelinesJson.value)
    setGeoDataStyles(pipelinesData.value, { styles: {defaultStyle: defaultPipelinesStyles} })
    fitBounds(map.value, pipelinesData.value)
  }
}

const clearPipelines = () => {
  if (pipelinesData.value) {
    pipelinesData.value.forEach(feature => {
      pipelinesData.value.remove(feature)
    })

    pipelinesData.value = undefined
    pipelinesJson.value = undefined
    pipelinesItems.value = undefined
    pipelinesLoading.value = undefined
    pipelinesLoadingError.value = undefined
  }
}

onBeforeUnmount(() => {
  clearBounds()
})
</script>
