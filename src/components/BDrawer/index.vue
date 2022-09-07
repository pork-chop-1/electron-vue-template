<template>
  <teleport to='body' >
    <div class="drawer-wrapper">
      <div class="drawer-mask"></div>
      <div class="drawer-content">

      </div>
    </div>
  </teleport>
</template>
<script lang="ts" setup>
import { toRef } from 'vue';

const props = defineProps<{
  visible: boolean,
  width?: string
}>()

const visible = toRef(props, 'visible')
const emits = defineEmits(['update:visible'])


</script>
<style lang="scss">
  .drawer-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;

    .drawer-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background: #00000073
    }

    .drawer-content {
      width: 400px;
      height: 100%;
      right: 0;
      top: 0;
    }
  }
</style>