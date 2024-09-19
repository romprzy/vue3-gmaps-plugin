<template>
  <div
    class="list-item"
    :class="{ current: item.selected, active: item.active }"
    @click="$emit('click', item)"
    @mouseleave="$emit('mouseleave', item)"
    @mouseover="$emit('mouseenter', item)"
  >
    {{ item.name }} ({{ item.iso }})
  </div>
</template>

<script setup lang="ts">
interface IItem {
  id?: string | number
  name: string
  iso?: string
  active?: boolean
  selected?: boolean
}
export interface IRussianRegionsProps {
  item: IItem
}
defineProps<IRussianRegionsProps>()
defineEmits(['click', 'mouseenter', 'mouseleave'])
</script>

<style lang="scss">
.list-item {
  position: relative;
  padding: .35em 2em;
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
