<template>
  <div class="player-container">
    <!-- <div class="bottom-group">
      <div class="prev">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-prev"></use>
        </svg>
      </div>
      <div class="play">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pause"></use>
        </svg>
      </div>
      <div class="next">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-next"></use>
        </svg>
      </div>
    </div> -->
    <div class="slider-container">
      <!-- <div class="current-time"></div> -->
      <Slider v-model:percentage="percentage" :width="300" />
      <!-- <div class="end-time"></div> -->
    </div>
    <audio 
      :src="url" 
      class="inner-audio" 
      ref="audio"
      @loadedmetadata="loadedmetadata"
      @timeupdate="timeupdate"
      @ended="">
    </audio>
  </div>
</template>
<script lang="ts" setup>
import Slider from '@/components/Slider/index.vue'
import { onMounted, ref, toRefs, watch } from 'vue';

const props = defineProps<{
  url: string,
  endTime: number,
  currentTime: number
  paused: boolean
}>()

const {url, currentTime, paused, endTime} = toRefs(props)

const emits = defineEmits(['update:currentTime', 'update:endTime'])

const percentage = ref(0)

const audio = ref<HTMLMediaElement | null>(null)
onMounted(() => {
  if(audio.value) {
    audio.value.addEventListener('canplay', (event) => {
      console.log('Video can start, but not sure it will play through.');
    });
  }
})

// 音乐基础信息已获得
const loadedmetadata = () => {
  emits('update:endTime', audio.value?.currentTime)
}
let isDragging = false
const timeupdate = () => {
  if(!isDragging) {
    emits('update:currentTime', audio.value?.currentTime)
  }
}

// 监听是否停止
watch(paused, (v) => {
  if(audio.value) {
    if(v) {
      audio.value.pause()
    } else {
      audio.value.play()
    }
  }
})
</script>
<style lang="scss">
.player-container {

  .inner-audio {
    display: none;
  }
}
</style>