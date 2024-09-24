<template>
  <h1>Home</h1>

  <v-container fluid>
    <v-row>
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
import RussianRegions from '../../examples/geo-json/RussianRegions.vue'
import RussianOilPipielines from '../../examples/geo-json/RussianOilPipielines.vue'
import RussianRegions2 from '../../examples/geo-json/RussianRegions2.vue'
import RussianRegions3 from '../../examples/geo-json/RussianRegions3.vue'
</script>
