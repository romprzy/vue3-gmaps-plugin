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
    </div>
  </div>
</template>

<script setup lang="ts">
import RussianRegions from './examples/geo-json/RussianRegions.vue'
import RefineriesExample from './examples/markers/RefineriesExample.vue'
import RussianOilPipielines from './examples/geo-json/RussianOilPipielines.vue'
import RefineriesExample2 from './examples/markers/RefineriesExample2.vue'
import RefineriesExample3 from './examples/markers/RefineriesExample3.vue'

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
  //color: #fff;
}

.container {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  background: #333;
  justify-content: space-between;
  align-items: stretch;
  gap: 0;
}

.column {
  box-sizing: border-box;
  position: relative;
  flex-basis: 50%;
  padding: 12px;
  height: 50vh;
}
</style>

