<template>
  <v-app>
    <v-app-bar density="compact">
      <v-app-bar-title>Vue 3 Gmaps Plugin</v-app-bar-title>
      <v-btn :to="{ name: 'Home' }">Home</v-btn>
      <v-btn :to="{ name: 'Markers' }">Markers</v-btn>
      <v-btn :to="{ name: 'Combined' }">Combined</v-btn>
      <v-btn :to="{ name: 'GeoJson' }">GeoJson</v-btn>
    </v-app-bar>
    <v-main class="d-flex flex-column overflow-hidden" style="height: 100vh;">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
html, body {
  overflow: hidden;
}
</style>
