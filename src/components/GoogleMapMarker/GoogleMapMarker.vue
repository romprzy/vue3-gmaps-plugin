<template>
  <div ref="markerElement" class="google-maps-marker">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { IGoogleMapMarkerProps } from './index.ts'

defineProps<IGoogleMapMarkerProps>()
defineEmits(['click:marker'])
</script>
