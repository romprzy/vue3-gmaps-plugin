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
interface IGoogleMapMarkerProps {
  options: google.maps.marker.AdvancedMarkerElementOptions
  round?: boolean
  size?: number
}

defineProps<IGoogleMapMarkerProps>()
defineEmits(['click:marker'])
// const markerElement = useTemplateRef('markerElement')

// onMounted(async () => {
//   const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary
//   const marker = new AdvancedMarkerElement({
//     position: {
//       lat: props.options.position.lat,
//       lng: props.options.position.lng,
//     },
//     map: props.map,
//     // content: markerElement.value,
//   })
//
//   // window.markers.push(marker)
//   //
//   // marker.addListener('click', ($event: MouseEvent) => {
//   //   emits('click:marker', {
//   //     markerElement: markerElement.value,
//   //     $event,
//   //     options: props.options,
//   //   })
//   // })
// })
</script>

<style lang="scss">
.google-maps-marker {
  color: #fff;
  //background-color: rgba(200, 100, 0, .25);
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
