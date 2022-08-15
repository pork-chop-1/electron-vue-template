<template>
  <div class="bottom-wrapper">
    <div class="l">
      <div class="avatar-wrapper"></div>
      <div class="info-wrapper">
        <div class="title"></div>
        <div class="author"></div>
      </div>
    </div>
    <div class="c">
      <div class="control-wrapper"></div>
      <div class="slider-wrapper">
        <Slider/>
      </div>
    </div>
    <div class="r">
      <button>list</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Slider from '@/components/Slider/index.vue'

</script>
<style lang="scss">
  .bottom-wrapper {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    background: var(--theme-background-color);
    color: var(--theme-foreground-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>