<template>
  <div 
    @mousedown="mousedown" 
    class="slider-container" 
    ref="container"
  >
    <div class="slider-pointer">
      <div class="slider-button" :class="{dragging}"></div>
    </div>
    <div class="bar-wrapper">
      <div class="foreground-load-bar"></div>
      <div class="background-load-bar"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
export interface API {
  dragging: boolean;
}

import { computed, reactive, ref, toRef, watch } from 'vue';
import {throttle} from 'lodash-es'

const props = defineProps<{
  // mouseDown: (percentage: number) => void,
  // mouseMove: (percentage: number) => void,
  mouseUp?: (percentage: number) => void,
  width: number,
  height: number,
  percentage: number,
  backgroundPercentage?: number,
  orientation?: 'vertical' | 'horizontal'
}>()

const emits = defineEmits(['update:percentage'])
const percentage = toRef(props, 'percentage')
const width = toRef(props, 'width')
const height = toRef(props, 'height')
const mouseUp = toRef(props, 'mouseUp')
const orientation = toRef(props, 'orientation')
const backgroundPercentage = toRef(props, 'backgroundPercentage')

const dragging = ref(false)

const container = ref<HTMLElement>()
  
const barStyle = computed(() => {
  return {
    width: width.value + 'px',
    height: height.value + 'px',
    borderRadius: height.value / 2 + 'px',
  }
})
const buttonStyle = reactive({
  left: '0px'
})
const foregroundStyle = reactive({
  width: '0px'
})
const backgroundStyle = reactive({
  width: backgroundPercentage.value ? backgroundPercentage.value * width.value / 100 + 'px' : '0'
})

/**
 * 根据位置设置percentage
 * 直接调用emits将会造成卡顿，所以节流
 */
const updatePercentage = throttle((left: number) => {
    emits('update:percentage', Math.floor((left) / width.value * 10000) / 100)
  }, 100, { 'trailing': false })
const setLoc = (left: number) => {
  foregroundStyle.width = `${left}px`
  buttonStyle.left = `${left}px`
  updatePercentage(left)
}

/**
 * 根据percentage设置位置
 */
const setPercentage = (per: number) => {
  foregroundStyle.width = `${width.value / 100 * per}px`
  buttonStyle.left = `${width.value / 100 * per}px`
}

const isHorizontal = orientation.value == null || orientation.value === 'horizontal'

const mousedown = (e: MouseEvent) => {
  if (!container.value) {
    return
  }
  let left = 0
  let loc = 0
  // 水平朝向
  if(isHorizontal) {
    left = container.value.getBoundingClientRect().left
    loc = e.pageX - left
  } else {
    // 竖直朝向
    left = container.value.getBoundingClientRect().top
    loc = width.value - (e.pageY - left)
  }
  loc < 0 && (loc = 0)
  loc > width.value && (loc = width.value)
  setLoc(loc)
  dragging.value = true
  document.onmousemove = (moveEvent: MouseEvent) => {
    let loc = 0
    if(isHorizontal) { 
      loc = moveEvent.pageX - left
    } else {
      loc = width.value - (moveEvent.pageY - left)
    }
    loc < 0 && (loc = 0)
    loc > width.value && (loc = width.value)
    setLoc(loc)
  }
  document.onmouseup = (moveEvent: MouseEvent) => {
    dragging.value = false
    mouseUp.value && mouseUp.value(percentage.value)
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
  user-select: none;
  padding: v-bind('barStyle.borderRadius') 0;

  .slider-pointer {
    position: relative;
    left: v-bind('buttonStyle.left');
    width: 0;
    height: 0;

    .slider-button {
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #fff;
      transform: translate(-50%, -50%);
      // left: -50%;
      box-sizing: border-box;
      border: 1px solid var(--theme-bg);
      z-index: 2;

      &.dragging {
        box-shadow: inset 0 0 2px var(--theme-bg);
      }
    }
  }

  .bar-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgb(0, 255, 42);
    border-radius: v-bind('barStyle.borderRadius');
    overflow: hidden;
  }

  .foreground-load-bar {
    position: absolute;
    width: v-bind('foregroundStyle.width');
    height: v-bind('barStyle.height');
    left: 0;
    top: 0;
    background-color: rgb(0, 160, 27);
  }

  .background-load-bar {
    position: absolute;
    width: v-bind('backgroundStyle.width');
    height: v-bind('barStyle.height');
    left: 0;
    top: 0;
    background-color: rgb(63, 98, 213);
  }
}
</style>