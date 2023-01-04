<template>
  <div class="drop-down-container" ref="container" :style="props.style" @click.right="rightClick">
    <div class="drop-down-item" v-show="visible" ref="dropdownItem">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRef, watch } from 'vue';
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
  visible: boolean,
  style?: {[key: string]: string}
}>()
const emits = defineEmits(['update:visible'])

const container = ref<HTMLElement>()
const lastModify = ref<number>(0)

const visible = toRef(props, 'visible')
const dropdownItem = ref<HTMLElement>()
const rightClick = (e: MouseEvent) => {
  console.log(dropdownItem.value)
  if (!dropdownItem.value) {
    return
  }
  dropdownItem.value.style.left = e.offsetX + 'px'
  dropdownItem.value.style.top = e.offsetY + 'px'

  emits('update:visible', true)
}
onClickOutside(dropdownItem, (event) => {
  emits('update:visible', false)
})
// watch(visible, (v) => {
//   lastModify.value = Date.now()
// })

</script>
<style scoped lang="scss">
.drop-down-container {
    overflow: visible;
    background-color: var(--plain-bg);

    .drop-down-item{
      position: relative;
    }
  }
</style>
