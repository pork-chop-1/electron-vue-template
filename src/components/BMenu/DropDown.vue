<template>
  <div class="drop-down-container" ref="container" v-show="visible">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>import { ref } from 'vue';


const props = defineProps({
  visible: {
    type: Boolean,
    require: true
  }
})
const emits = defineEmits(['update:visible'])

const container = ref<HTMLElement>()

const closeHandler = (e: MouseEvent) => {
  if (props.visible === false) {
    return
  }
  console.log(props.visible)
  const element = e.target

  if (element && container.value != null) {
    if (!container.value.contains(element as HTMLElement)) {
      // document.removeEventListener('click', closeHandler)
      emits('update:visible', false)
    }
  }
}
document.addEventListener('click', closeHandler, true)
</script>
<style>
</style>