<template>
  <div
    ref="markerElement"
    class="google-maps-marker"
    :class="{'google-maps-marker--round': round}"
    :style="{ width: size && `${size}px`, height: size && `${size}px`}"
  >
    <slot>
      <div class="google-maps-marker_content">
        <slot name="title">
          <div class="google-maps-marker_title">
            {{ options.title }}
          </div>
        </slot>
        <slot name="subtitle" />
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
interface IGoogleMapMarkerProps {
  map: google.maps.Map
  options: google.maps.marker.AdvancedMarkerElementOptions
  advancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement
  round?: boolean
  size?: number
}

const props = defineProps<IGoogleMapMarkerProps>()
const emits = defineEmits(['click:marker'])
const markerElement = ref()

onMounted(() => {
  const marker = new props.advancedMarkerElement({
    ...props.options,
    map: props.map,
    content: markerElement.value,
  })

  marker.addListener('click', ($event: MouseEvent) => {
    emits('click:marker', {
      markerElement: markerElement.value,
      $event,
      options: props.options,
    })
  })
})
</script>

<style lang="scss">
.google-maps-marker {
  color: #fff;
  background-color: rgba(200, 100, 0, .25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &--round {
    border-radius: 50%;
  }

  &_title {
    font-weight: 500;
    font-size: .9rem;
    padding: 0 0.25em;
    min-width: 3em;
    text-align: center;
  }
  &_subtitle {
    font-weight: 300;
    font-size: .75rem;
    padding: 0 0.25em;
    min-width: 3em;
    text-align: center;
  }
  &_content {
    background: rgba(0, 0, 0, .25);
    padding: .2em .5em;
    //position: absolute;
    //bottom: 70%;
  }
}
</style>
