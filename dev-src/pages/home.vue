<template>
  <h1>Home</h1>

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
</template>

<script setup lang="ts">
import RefineriesExample2 from '../../examples/markers/RefineriesExample2.vue'
import RefineriesExample from '../../examples/markers/RefineriesExample.vue'
import RussianRegions from '../../examples/geo-json/RussianRegions.vue'
import RefineriesExample3 from '../../examples/markers/RefineriesExample3.vue'
import RussianOilPipielines from '../../examples/geo-json/RussianOilPipielines.vue'
import RussianRegions2 from '../../examples/geo-json/RussianRegions2.vue'
import CombinedMap from '../../examples/combined-maps/CombinedMap.vue'
import RussianRegions3 from '../../examples/geo-json/RussianRegions3.vue'
</script>
