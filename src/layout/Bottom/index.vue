<template>
  <div class="bottom-wrapper">
    <div class="l">
      <div class="avatar-wrapper" @click="toggleSongPlane">
        <!-- todo -->
        toggle
      </div>
      <div class="info-wrapper">
        <div class="title"></div>
        <div class="author"></div>
      </div>
    </div>
    <div class="c">
      <div class="control-wrapper"></div>
      <div class="slider-wrapper">
        <Slider v-model:percentage="percentage" :width="width"/>
        <span>{{percentage}}</span>
      </div>
    </div>
    <div class="r">
      <button>list</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRef } from 'vue';
import Slider from '@/components/Slider/index.vue'
import {usePlay} from '@/store/play'

const percentage = ref(0)
const width = ref(300)
// 处理详情开闭
const playStore = usePlay()
const opened = toRef(playStore, 'songPlaneOpened')
const toggleSongPlane = () => {
  opened.value = !opened.value
}
</script>
<style lang="scss">
  .bottom-wrapper {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    background: var(--theme-bg);
    color: var(--theme-fg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;

    .l {
      .avatar-wrapper {
        width: 40px;
        height: 40px;
      }
    }
  }
</style>