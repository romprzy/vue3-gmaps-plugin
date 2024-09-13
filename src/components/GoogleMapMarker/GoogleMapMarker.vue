<template>
  <div ref="markerElement" style="color: white;">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { IGoogleMapMarkerProps } from './'
import { onMounted, ref } from 'vue'

const props = defineProps<IGoogleMapMarkerProps>()

const markerElement = ref()

onMounted(() => {
  new props.advancedMarkerElement(props.options)
})
</script>
