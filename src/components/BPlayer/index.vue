<template>
  <div class="player-container">
    
    <!-- 仅仅包含最简单的进度条 -->
    <div class="slider-container">
      <Slider 
        ref="slider"
        v-model:percentage="percentage" 
        :width="300" 
        :height="5"
        :mouseUp="mouseUp" />
    </div>
    <!-- 使用html audio作为播放器，但是不显示控件 -->
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
import Slider, {API as SliderAPI} from '@/components/Slider/index.vue'
import { computed, onMounted, reactive, ref, toRef, toRefs, watch } from 'vue';

const props = defineProps<{
  url: string,
  endTime: number,
  currentTime: number,
  playing: boolean
}>()

const {url, currentTime, playing, endTime} = toRefs(props)

// 使用v-model暴露当前时间和长度的改变方式
const emits = defineEmits(['update:currentTime', 'update:endTime'])

// 获slider子组件中的isDragging
// https://juejin.cn/post/7031921830852034591
const slider = ref<SliderAPI | null>(null)
const isDragging = computed(() => slider.value)

// 进度条百分比，可直接改变
const percentage = ref(0)

const audio = ref<HTMLMediaElement | null>(null)
onMounted(() => {
  if(audio.value) {
    audio.value.addEventListener('canplay', (event) => {
      // console.log('Video can start, but not sure it will play through.');
    });
  }
})

// 音乐基础信息已获得，获取时长
const loadedmetadata = () => {
  emits('update:endTime', audio.value?.duration)
}

const timeupdate = () => {
  emits('update:currentTime', audio.value?.currentTime)
  if(isDragging.value) {
  } else {
    if(endTime.value !== 0) {
      percentage.value = Math.round(currentTime.value / endTime.value * 100)
    }
  }
}

// 监听是否停止
watch(playing, (v) => {
  if(audio.value) {
    if(v) {
      audio.value.play()
    } else {
      audio.value.pause()
    }
  }
})

// 监听拖动
const mouseUp = (newPer: number) => {
  percentage.value = newPer
  if(endTime.value !== 0) {
    audio.value && (audio.value.currentTime = newPer / 100 * endTime.value)
  }
}
</script>
<style lang="scss">
.player-container {

  .inner-audio {
    display: none;
  }
}
</style>