<template>
  <div class="drop-down-container" ref="container" v-show="visible">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRef, watch } from 'vue';
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
  visible: boolean
}>()
const emits = defineEmits(['update:visible'])

const container = ref<HTMLElement>()
const lastModify = ref<number>(0)

onClickOutside(container, (event) => {
  emits('update:visible', false)
})
// const visible = toRef(props, 'visible')
// watch(visible, (v) => {
//   lastModify.value = Date.now()
// })



// const closeHandler = (e: MouseEvent) => {
//   if((Date.now() - lastModify.value) < 100) {
//     return
//   }
//   if (props.visible === false) {
//     return
//   } else {
//     // Math.
//   }
//   // console.log(props.visible)
//   const element = e.target

//   if (element && container.value != null) {
//     if (!container.value.contains(element as HTMLElement)) {
//       // document.removeEventListener('click', closeHandler)
//       emits('update:visible', false)
//     }
//   } else {
//   }
// }
// document.addEventListener('click', closeHandler)
</script>
<style scoped lang="scss">
  .drop-down-container {
    overflow: auto;
    background-color: var(--plain-bg);
  }
</style>