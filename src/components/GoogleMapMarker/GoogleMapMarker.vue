<template>
  <div ref="markerElement" class="google-maps-marker">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { IGoogleMapMarkerProps } from './index.ts'
import { onMounted, useTemplateRef } from 'vue'

const props = defineProps<IGoogleMapMarkerProps>()
const markerElement = useTemplateRef('markerElement')

onMounted(() => {
  // new props.advancedMarkerElement(props.options)
})
</script>
