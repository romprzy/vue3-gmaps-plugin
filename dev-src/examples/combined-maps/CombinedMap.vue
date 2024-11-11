<template>
  <v-container class="d-flex flex-column flex-grow-1 overflow-hidden" fluid>
    <v-row class="overflow-hidden">
      <v-col
        class="d-flex flex-column pa-0 flex-grow-1"
        cols="12"
        lg="8"
      >
        <v-toolbar class="pa-0" density="compact">
          <v-toolbar-title class="flex-shrink-0 ma-0 px-4" style="flex-basis: auto;">Combined map</v-toolbar-title>
          <v-divider vertical />
          <v-toolbar-items>
            <v-menu persistent>
              <template #activator="{ props }">
                <v-btn v-bind="props" prepend-icon="mdi-check">
                  Refineries
                </v-btn>
              </template>
              <v-btn-group
                density="compact"
                divided
                tile
              >
                <v-btn
                  icon="mdi-tray-arrow-down"
                  @click="fullSetRefineries"
                />
                <v-switch v-model="refineriesShown" @update:model-value="() => refineriesShown ? showRefineries() : hideRefineries()" />
                <v-switch v-model="refineriesSize" @update:model-value="() => refineriesSize ? showRefineriesSize() : hideRefineriesSize()" />
              </v-btn-group>
              <v-list tile>
                <v-list-item :disabled="!!markers?.length" @click="loadRefineries">
                  <v-list-item-title>Load</v-list-item-title>
                </v-list-item>
                <v-list-item :disabled="!markers?.length || !!Object.keys(advancedMarkers)?.length" @click="setRefineries">
                  <v-list-item-title>Set</v-list-item-title>
                </v-list-item>
                <v-list-item :disabled="!markers?.length || !Object.keys(advancedMarkers)?.length || refineriesShown" @click="showRefineries">
                  <v-list-item-title>Show</v-list-item-title>
                </v-list-item>
                <v-list-item :disabled="!markers?.length || !Object.keys(advancedMarkers)?.length || !refineriesShown" @click="hideRefineries">
                  <v-list-item-title>Hide</v-list-item-title>
                </v-list-item>
                <v-list-item :disabled="!markers?.length && !Object.keys(advancedMarkers)?.length" @click="clearRefineries">
                  <v-list-item-title>Clear</v-list-item-title>
                </v-list-item>
                <v-list-item :disabled="!markers?.length" @click="unloadRefineries">
                  <v-list-item-title>Unload</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-divider vertical />

            <v-btn
              :class="{'bg-error': boundsLoadingError, 'bg-info': boundsLoading, 'bg-success': boundsJson}"
              color="info"
              :loading="boundsLoading"
              variant="flat"
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
            <v-btn
              color="info"
              variant="outlined"
              @click="clearBounds"
            >clearBounds</v-btn>
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
            <v-btn @click="clearPipelines">Clear pipelines</v-btn>
            <v-divider vertical />
            <v-btn @click="fitBounds(map, boundsData)">Center map</v-btn>
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
          <GoogleMapLoader class="flex-grow-1"
                           @set:map="setMap"
          />
          <template>
            <div
              v-for="marker in markers"
              :key="marker.id"
              :ref="(el) => markerElements[marker.id] = el"
              class="rounded-circle"
              style="background: rgba(var(--v-theme-primary), .75)"
            >
              <BasicMarker
                :options="{ title: marker.name }"
                round
                :size="markerSize(marker)"
              >
                <template #subtitle>
                  <div class="google-maps-marker_subtitle">{{ marker.mTPerYear || '?' }}</div>
                </template>
              </BasicMarker>
            </div>
            <div
              v-for="marker in markers"
              :key="`info-${marker.id}`"
              :ref="(el) => markersInfoWindowsElements[marker.id] = el"
            >
              <h2 class="pa-3 pr-12 font-weight-light text-center">{{ marker.name }}</h2>

              <v-divider />

              <div class="mr-n14">
                <v-btn-group
                  density="compact"
                  divided
                  variant="text"
                >
                  <v-checkbox-btn />
                  <v-btn icon="mdi-eye" @click="console.log('ojoj')" />
                  <v-btn>Ojoj</v-btn>
                  <v-btn>Ojoj</v-btn>
                </v-btn-group>
              </div>
            </div>
          </template>
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
import { onBeforeUnmount, onMounted, ref, shallowRef, useTemplateRef } from 'vue'
import { IGoogleStyle, IWMGeoLabGeoBoundaries } from '@/types'
import { fitBounds, prepareWMGeoLabGeoJson } from '@/helpers'
import { IUseSetGeoDataStylesOptions, useSetGeoDataStyles } from '@/composables/useSetGeoDataStyles'
import { useTheme } from 'vuetify'

// onMounted(async () => {
//   const { MapTypeId } = await google.maps.importLibrary('maps')
//   mapType.value = MapTypeId.ROADMAP
// })
import { useGetGeoJson, useSetGoogleMap } from '@/composables'
// import MapTypeId = google.maps.MapTypeId
// import { MapTypeId } from '@types/google.maps'

const mapType = ref<typeof google.maps.MapTypeId>('roadmap')
const vTheme = useTheme()

const boundsUrl = '/data/geoBoundaries-RUS-ADM1_simplified.geojson?url'
const pipelinesUrl = '/data/oil-pipelines.geo.json'
const refineriesUrl = '/data/refineries.json'
// const pipelinesUrl = '/data/Oil Infrastructure - map data 2024-06-12_1934.geo.json?url'

const markerElements = ref<Record<string | number, HTMLElement>>({})
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

const boundsData = shallowRef()
const boundsJson = shallowRef<IWMGeoLabGeoBoundaries>()
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

const pipelinesData = shallowRef()
const pipelinesJson = shallowRef<IWMGeoLabGeoBoundaries>()
const pipelinesItems = ref()
const defaultPipelinesStyles: IGoogleStyle = {
  strokeColor: 'green',
  fillColor: vTheme.current.value.colors.success,
}

const setPipelinesGeoData = async() => {
  pipelinesLoading.value = true
  pipelinesJson.value = await getPipelines()

  if (pipelinesJson.value) {
    pipelinesItems.value = pipelinesJson.value
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

// markers
const markers = shallowRef()
const markersInfoWindowsElements = shallowRef({})
const markersInfoWindows = ref({})
const advancedMarkers = ref({})
const markerSize = (marker) => 20 * Math.sqrt(marker.mTPerYear || 2)
const clickMarker = ({ $event, marker, advancedMarkerElement }) => {
  console.log('$event', $event)
  // console.log('marker', markerElement)
  // console.log('marker', marker)
  // console.log('target', $event.domEvent.target)

  const infoWindow = markersInfoWindows.value?.[marker.id] || new google.maps.InfoWindow({
    content: markersInfoWindowsElements.value?.[marker.id],
  })

  markersInfoWindows.value[marker.id] = infoWindow

  console.log('infoWindow', infoWindow)

  if (infoWindow.isOpen) {
    infoWindow.close()
  } else {
    infoWindow.setContent(markersInfoWindowsElements.value?.[marker.id])
    infoWindow.open(advancedMarkerElement.map, advancedMarkerElement)
  }
}

const loadRefineries = async () => {
  const markerItems = await fetch(refineriesUrl)
    .then(response => response.json())
  markers.value = markerItems.filter(({ lat, lng }) => lat && lng).map(markerItem => ({ ...markerItem, id: markerItem.name }))
}

const setRefineries = async () => {
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary

  refineriesShown.value = true
  refineriesSize.value = true

  markers.value?.forEach((marker, index) => {
    advancedMarkers.value[marker.id] = new AdvancedMarkerElement({
      map: map.value,
      content: markerElements.value[marker.id],
      // gmpClickable: true,
      position: {
        'lat': marker.lat,
        'lng': marker.lng,
      },
    })

    advancedMarkers.value[marker.id].addListener('click', ($event) => {
      console.log('click', $event)
      clickMarker({ $event, markerElement: markerElements.value[marker.id], marker, index, advancedMarkerElement: advancedMarkers.value[marker.id] })
    })
  })
}

const refineriesShown = ref()
const refineriesSize = ref()

const fullSetRefineries = async () => {
  if (!markers.value) await loadRefineries()
  await setRefineries()
}

const hideRefineries = () => {
  Object.values(advancedMarkers.value)?.forEach(marker => {
    marker.map = null
  })

  refineriesShown.value = false
}

const showRefineries = () => {
  Object.values(advancedMarkers.value)?.forEach(marker => {
    marker.map = map.value
  })

  refineriesShown.value = true
}

const showRefineriesSize = () => {
  Object.values(advancedMarkers.value)?.forEach(marker => {
    marker.content = markerElements.value[marker.id]
  })
}

const hideRefineriesSize = () => {
  Object.values(advancedMarkers.value)?.forEach(marker => {
    marker.content = undefined
  })
}

const clearRefineries = () => {
  hideRefineries()
  // markers.value = undefined
  advancedMarkers.value = {}
}

const unloadRefineries = () => {
  markers.value = undefined
}

onBeforeUnmount(() => {
  clearBounds()
})
</script>

<style lang="scss">
.gm-style-iw.gm-style-iw-c {
  padding: 0;
  padding-inline-end: 56px !important;
  background: rgba(0, 0, 0, .85);
  background: rgb(var(--v-theme-surface));
  outline: 1px solid rgba(255, 0, 0, .5);

  .gm-style-iw-chr {
    position: absolute;
    right: 0;
    filter: invert(1);
  }

  .gm-style-iw-d {
    max-height: none !important;
    overflow: visible !important;
    width: calc(100% + 56px) !important;
  }
}

.google-maps-marker-content {
  //padding: 12px;

  &__title {
    width: calc(100% - 32px);
  }
}
</style>
