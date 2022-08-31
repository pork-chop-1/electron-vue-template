<template>
  <div @mousedown="mousedown" class="slider-container" ref="container">
    <div class="slider-pointer">
      <div class="slider-button"></div>
    </div>
    <div class="background-load-bar"></div>
    <div class="foreground-load-bar"></div>
  </div>
  <div>{{ percentage }}</div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRef } from 'vue';

const props = defineProps<{
  // mouseDown: (percentage: number) => void,
  // mouseMove: (percentage: number) => void,
  // mouseUp: (percentage: number) => void,
  width: number,
  percentage: number
}>()

const emits = defineEmits(['update:percentage'])
const percentage = toRef(props, 'percentage')
const width = toRef(props, 'width')

const buttonRadius = 8

const container = ref<HTMLElement>()
const button = ref<HTMLElement>()
const buttonStyle = reactive({
  left: '0px'
})
const foregroundStyle = reactive({
  width: '0px'
})

const setLoc = (left: number) => {
  foregroundStyle.width = `${left}px`
  buttonStyle.left = `${left}px`
  emits('update:percentage', percentage)
}

const mousedown = (e: MouseEvent) => {
  if (!container.value) {
    return
  }
  var left = container.value.getBoundingClientRect().left
  setLoc(e.pageX - left)
  document.onmousemove = (moveEvent: MouseEvent) => {
    var loc = moveEvent.pageX - left
    loc < 0 && (loc = 0)
    loc > width.value && (loc = width.value)
    setLoc(loc)
  }
  document.onmouseup = (moveEvent: MouseEvent) => {
    document.onmousemove = null
    document.onmouseup = null
  }
}

// const mousedown = (e: MouseEvent) => {
//   var initLeft = container.value?.offsetLeft
//   document.onmousemove = (moveEvent: MouseEvent) => {
//     var left = moveEvent.pageX
//     if (initLeft) {
//       let computedLeft = left - initLeft - buttonRadius
//       computedLeft > width - buttonRadius && (computedLeft = width - buttonRadius)
//       computedLeft < 0 - buttonRadius && (computedLeft = 0 - buttonRadius)
//       buttonStyle.left = computedLeft + 'px'
//       setInfo(Math.floor((computedLeft + buttonRadius) / width * 10000) / 100)
//       foregroundStyle.width = computedLeft + buttonRadius + 'px'
//     }
//   }
//   document.onmouseup = (moveEvent: MouseEvent) => {
//     document.onmousemove = null
//     document.onmouseup = null
//   }
// }
</script>
<style lang="scss" scoped>
.slider-container {
  position: relative;
  width: 300px;
  height: 6px;
  background-color: rgb(0, 255, 42);
  // border-radius: 2px;
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
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: rgb(0 135 172 / 20%);
      top: -8px;
      left: -8px;
    }
  }

  .foreground-load-bar {
    position: relative;
    width: v-bind('foregroundStyle.width');
    height: 6px;
    background-color: rgb(0, 160, 27);

  }
}
</style>