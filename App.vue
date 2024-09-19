<template>
  <v-app>
    <v-app-bar density="compact">
      <v-app-bar-title>Vue 3 Gmaps Plugin</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col
            class="d-flex"
            cols="12"
            style="height: 100vh;"
          >
            <CombinedMap />
          </v-col>
          <v-col
            cols="12"
            lg="6"
          >
            <RefineriesExample3 />
          </v-col>
          <v-col
            cols="12"
            lg="6"
          >
            <RefineriesExample2 />
          </v-col>
          <v-col
            cols="12"
            lg="6"
          >
            <RefineriesExample />
          </v-col>
          <v-col
            cols="12"
            lg="6"
          >
            <RussianOilPipielines />
          </v-col>
          <v-col
            cols="12"
            lg="6"
          >
            <RussianRegions />
          </v-col>
          <v-col
            cols="12"
            lg="6"
          >
            <RussianRegions :map-options="{ mapTypeId: 'terrain' }" />
            <!--        <GoogleMapLoader-->
            <!--          :loader-options="loaderOptions"-->
            <!--          :map-options="mapOptions"-->
            <!--          :markers="markers"-->
            <!--        />-->
          </v-col>
          <v-col
            cols="12"
            style="flex-basis: 100%; display: flex;"
          >
            <RussianRegions3 />
            <!--        <GoogleMapLoader-->
            <!--          :loader-options="loaderOptions"-->
            <!--          :map-options="mapOptions"-->
            <!--          :markers="markers"-->
            <!--        />-->
          </v-col>
          <v-col
            cols="12"
            style="flex-basis: 100%; display: flex;"
          >
            <RussianRegions2 />
            <!--        <GoogleMapLoader-->
            <!--          :loader-options="loaderOptions"-->
            <!--          :map-options="mapOptions"-->
            <!--          :markers="markers"-->
            <!--        />-->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import RussianRegions from './src/examples/geo-json/RussianRegions.vue'
import RefineriesExample from './src/examples/markers/RefineriesExample.vue'
import RussianOilPipielines from './src/examples/geo-json/RussianOilPipielines.vue'
import RefineriesExample2 from './src/examples/markers/RefineriesExample2.vue'
import RefineriesExample3 from './src/examples/markers/RefineriesExample3.vue'
import RussianRegions2 from './src/examples/geo-json/RussianRegions2.vue'
import RussianRegions3 from './src/examples/geo-json/RussianRegions3.vue'
import CombinedMap from './src/examples/combined-maps/CombinedMap.vue'

// const data1 = new google.maps.Data({ map })
// const data2 = new google.maps.Data({ map })
//
// data1.loadGeoJson('/Oil Infrastructure - map data 2024-06-12_1934.geo.json')
// data1.setStyle({
//   strokeColor: 'pink',
//   strokeWeight: 1,
// })
//
// data2.loadGeoJson('/ru.geo.json')
// data2.setStyle({
//   strokeColor: 'blue',
//   strokeWeight: 1,
// })
</script>
