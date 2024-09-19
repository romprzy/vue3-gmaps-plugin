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
            <v-btn>Load boundaries</v-btn>
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
const mapType = ref('roadmap')

const geoJsonUrl = '/public/geoBoundaries-RUS-ADM1_simplified.geojson?url'

const map = ref<google.maps.Map>()
const setMap = (loadedMap: google.maps.Map) => {
  map.value = loadedMap
}
</script>
