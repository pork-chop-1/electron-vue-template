<template>
  <div v-show="visible">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    require: true
  }
})
const emits = defineEmits(['update:visible'])
</script>
<style>
</style>