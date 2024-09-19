<template>
  <v-list-item
    v-for="item in items"
    :key="item.id"
    class="list-item"
    :class="{ current: item.selected, active: item.active }"
    @click="$emit('click:item', item)"
    @mouseleave="$emit('mouseleave:item', item)"
    @mouseover="$emit('mouseenter:item', item)"
  >
    {{ item.name }} ({{ item.iso }})
  </v-list-item>
</template>

<script setup lang="ts">
interface IItem {
  id?: string | number
  name?: string
  iso?: string
  active?: boolean
  selected?: boolean
}
export interface IRussianRegionsProps {
  items: IItem[]
}
defineProps<IRussianRegionsProps>()
defineEmits(['click:item', 'mouseenter:item', 'mouseleave:item'])
</script>

<style lang="scss">
.list-item {
  position: relative;
  padding-left: 2em !important;
  cursor: pointer;
  border-top: 1px solid transparent;
  border-bottom: 1px solid #000;

  &.current {
    background: rgba(250, 100, 100, .25);
    border-top: 1px dashed rgba(255, 255, 255, .75);
    border-bottom: 1px dashed rgba(255, 255, 255, .75);

    &:before {
      content: '➔';
      position: absolute;
      left: .5em;
    }
  }

  &.active {
    background: rgba(50, 200, 78, .25);
  }
}

.error-text {
  color: red;
}
</style>
