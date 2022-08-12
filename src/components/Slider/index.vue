<template>
  <div ref="container" class="slider-container">
    <div ref="button" @mousedown="mousedown" class="slider-button"></div>
    <div class="background-load-bar"></div>
    <div class="foreground-load-bar"></div>
  </div>
  <div>{{ importantInfo.percentage }}</div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

const buttonRadius = 8
const width = 300

const container = ref<HTMLElement>()
const button = ref<HTMLElement>()
const buttonStyle = reactive({
  left: '-5px'
})
const foregroundStyle = reactive({
  width: '0px'
})

const importantInfo = reactive({
  percentage: 0
})

const setInfo = (percentage: number) => {
  importantInfo.percentage = percentage
}

const mousedown = (e: MouseEvent) => {
  var initLeft = container.value?.offsetLeft
  document.onmousemove = (moveEvent: MouseEvent) => {
    var left = moveEvent.pageX
    if (initLeft) {
      let computedLeft = left - initLeft - buttonRadius
      computedLeft > width - buttonRadius && (computedLeft = width - buttonRadius)
      computedLeft < 0 - buttonRadius && (computedLeft = 0 - buttonRadius)
      buttonStyle.left = computedLeft + 'px'
      setInfo(Math.floor((computedLeft + buttonRadius) / width * 100))
      foregroundStyle.width = computedLeft + buttonRadius + 'px'
    }
  }
  document.onmouseup = (moveEvent: MouseEvent) => {
    document.onmousemove = null
    document.onmouseup = null
  }
}
</script>
<style lang="scss" scoped>
.slider-container {
  position: relative;
  width: 300px;
  height: 6px;
  background-color: rgb(0, 255, 42);
  // border-radius: 2px;
  user-select: none;

  .slider-button {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgb(0 135 172 / 20%);
    left: v-bind('buttonStyle.left');
    top: -5px;
  }

  .foreground-load-bar {
    position: relative;
    width: v-bind('foregroundStyle.width');
    height: 6px;
    background-color: rgb(0, 160, 27);

  }
}
</style>