<template>
  <div
    class="google-maps-marker"
    :class="{'google-maps-marker--round': round}"
    :style="{ width: size && `${size}px`, height: size && `${size}px`}"
  >
    <div class="google-maps-marker_content">
      <slot>
        <slot name="title">
          <div class="google-maps-marker_title">
            {{ title }}
          </div>
        </slot>
      </slot>
      <slot name="subtitle" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface IBasicMarkerElementProps {
  title?: string
  round?: boolean
  size?: number
}

defineProps<IBasicMarkerElementProps>()
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
