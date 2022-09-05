<template>
  <div @mousedown="mousedown" class="slider-container" ref="container">
    <div class="slider-pointer">
      <div class="slider-button" :class="{dragging}"></div>
    </div>
    <div class="background-load-bar"></div>
    <div class="foreground-load-bar"></div>
  </div>
</template>
<script lang="ts" setup>
export interface API {
  dragging: boolean;
}

import { computed, reactive, ref, toRef, watch } from 'vue';

const props = defineProps<{
  // mouseDown: (percentage: number) => void,
  // mouseMove: (percentage: number) => void,
  mouseUp: (percentage: number) => void,
  width: number,
  height: number,
  percentage: number
}>()

const emits = defineEmits(['update:percentage'])
const percentage = toRef(props, 'percentage')
const width = toRef(props, 'width')
const height = toRef(props, 'height')
const mouseUp = toRef(props, 'mouseUp')

const dragging = ref(false)

const buttonRadius = 8

const container = ref<HTMLElement>()
const button = ref<HTMLElement>()
const barStyle = computed(() => {
  return {
    width: width.value + 'px',
    height: height.value + 'px',
    borderRadius: height.value / 2 + 'px'
  }
})
const buttonStyle = reactive({
  left: '0px'
})
const foregroundStyle = reactive({
  width: '0px'
})

/**
 * 根据位置设置percentage
 */
const setLoc = (left: number) => {
  foregroundStyle.width = `${left}px`
  buttonStyle.left = `${left}px`
  emits('update:percentage', Math.floor((left) / width.value * 10000) / 100)
}

/**
 * 根据percentage设置位置
 */
const setPercentage = (per: number) => {
  foregroundStyle.width = `${width.value / 100 * per}px`
  buttonStyle.left = `${width.value / 100 * per}px`
}

const mousedown = (e: MouseEvent) => {
  if (!container.value) {
    return
  }
  let left = container.value.getBoundingClientRect().left
  let loc = e.pageX - left
  loc < 0 && (loc = 0)
  loc > width.value && (loc = width.value)
  setLoc(loc)
  dragging.value = true
  document.onmousemove = (moveEvent: MouseEvent) => {
    let loc = moveEvent.pageX - left
    loc < 0 && (loc = 0)
    loc > width.value && (loc = width.value)
    setLoc(loc)
  }
  document.onmouseup = (moveEvent: MouseEvent) => {
    dragging.value = false
    mouseUp.value(percentage.value)
    document.onmousemove = null
    document.onmouseup = null
  }
}

// 监听外部percentage变化
watch(percentage, (v) => {
  setPercentage(v)
})

defineExpose({
  dragging
})

</script>
<style lang="scss" scoped>
.slider-container {
  position: relative;
  width: v-bind('barStyle.width');
  height: v-bind('barStyle.height');
  background-color: rgb(0, 255, 42);
  border-radius: v-bind('barStyle.borderRadius');
  user-select: none;

  .slider-pointer {
    position: absolute;
    // width: 16px;
    // height: 16px;
    // border-radius: 50%;
    // background-color: rgb(0 135 172 / 20%);
    left: v-bind('buttonStyle.left');
    // top: -5px;

    .slider-button {
      position: relative;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #fff;
      transform: translateY(-25%);
      left: -50%;
      box-sizing: border-box;
      border: 1px solid var(--theme-bg);
      z-index: 2;

      &.dragging {
        box-shadow: inset 0 0 2px var(--theme-bg);
      }
    }
  }

  .foreground-load-bar {
    position: relative;
    width: v-bind('foregroundStyle.width');
    height: v-bind('barStyle.height');
    background-color: rgb(0, 160, 27);

  }
}
</style>