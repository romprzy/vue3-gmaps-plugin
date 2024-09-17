<template>
  <div>
    <div style="flex-basis: 100%; padding: 12px; text-align: center;">Vue 3 Gmaps Plugin</div>
    <div class="container">
      <div class="column">
        <RefineriesExample3 />
      </div>
      <div class="column">
        <RefineriesExample2 />
      </div>
      <div class="column">
        <RefineriesExample />
      </div>
      <div class="column">
        <RussianOilPipielines />
      </div>
      <div class="column">
        <RussianRegions />
      </div>
      <div class="column">
        <RussianRegions :map-options="{ mapTypeId: 'terrain' }" />
        <!--        <GoogleMapLoader-->
        <!--          :loader-options="loaderOptions"-->
        <!--          :map-options="mapOptions"-->
        <!--          :markers="markers"-->
        <!--        />-->
      </div>
      <div class="column" style="flex-basis: 100%; display: flex;">
        <RussianRegions3 />
        <!--        <GoogleMapLoader-->
        <!--          :loader-options="loaderOptions"-->
        <!--          :map-options="mapOptions"-->
        <!--          :markers="markers"-->
        <!--        />-->
      </div>
      <div class="column" style="flex-basis: 100%; display: flex;">
        <RussianRegions2 />
        <!--        <GoogleMapLoader-->
        <!--          :loader-options="loaderOptions"-->
        <!--          :map-options="mapOptions"-->
        <!--          :markers="markers"-->
        <!--        />-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RussianRegions from './src/examples/geo-json/RussianRegions.vue'
import RefineriesExample from './src/examples/markers/RefineriesExample.vue'
import RussianOilPipielines from './src/examples/geo-json/RussianOilPipielines.vue'
import RefineriesExample2 from './src/examples/markers/RefineriesExample2.vue'
import RefineriesExample3 from './src/examples/markers/RefineriesExample3.vue'
import RussianRegions2 from './src/examples/geo-json/RussianRegions2.vue'
import RussianRegions3 from './src/examples/geo-json/RussianRegions3.vue'

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

<style>
html, body {
  padding: 0;
  margin: 0;
  font-family: Candara;
}

.container {
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  background: #333;
  justify-content: space-between;
  align-items: stretch;
  gap: 0;
}

.column {
  box-sizing: border-box;
  position: relative;
  flex-basis: 100%;
  padding: 12px;
  min-height: 300px;
}

@media(min-width: 768px) {
  .column {
    flex-basis: 50%;
  }
}

@media(min-height: 768px) {
  .column {
    min-height: 50vh;
  }
}
</style>

