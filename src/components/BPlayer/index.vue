<template>
  <div class="player-container">

    <!-- 仅仅包含最简单的进度条 -->
    <div class="slider-container">
      <Slider 
        ref="slider" 
        v-model:percentage="percentage" 
        :backgroundPercentage="bgPercentage"
        :width="300" 
        :height="5" 
        :mouseUp="mouseUp" 
      />
    </div>
    <!-- 使用html audio作为播放器，但是不显示控件 -->
    <audio 
      :src="url" 
      class="inner-audio" 
      ref="audio" 
      @loadedmetadata="loadedmetadata" 
      @timeupdate="timeupdate"
      @canplay="canplay"
      @ended="ended">
    </audio>
  </div>
</template>
<script lang="ts" setup>
import Slider, { API as SliderAPI } from '@/components/Slider/index.vue'
import { computed, onBeforeUnmount, onMounted, reactive, ref, toRef, toRefs, watch } from 'vue';

const props = defineProps<{
  url: string,
  endTime: number,
  currentTime: number,
  playing: boolean,
  volume: number,
  ended?: () => void
}>()

const { url, currentTime, playing, endTime, volume } = toRefs(props)

// 使用v-model暴露当前时间和长度的改变方式
const emits = defineEmits(['update:currentTime', 'update:endTime'])

// 获slider子组件中的isDragging
// https://juejin.cn/post/7031921830852034591
const slider = ref<SliderAPI | null>(null)
const isDragging = computed(() => slider.value?.dragging)

// 进度条百分比，可直接改变
const percentage = computed({
  get: () => {
    return currentTime.value * 100 / endTime.value
  }, 
  set: async (newVal: number) => {
    const newTime = newVal / 100 * endTime.value
    if(newTime !== currentTime.value) {
      emits('update:currentTime', newVal / 100 * endTime.value)
    }
  }
})
// watch(percentage, (v) => {
//   emits('update:currentTime', v / 100 * endTime.value)
// })


const audio = ref<HTMLMediaElement | null>(null)

// 音乐基础信息已获得，获取时长
const loadedmetadata = () => {
  emits('update:endTime', audio.value?.duration)
}

const canplay = () => {
  if(audio.value) {
    audio.value.volume = volume.value
  }
  // 切换源后，play为true将自动播放
  if (playing.value) {
    audio.value?.play()
  }
}

const timeupdate = () => {
  if (isDragging.value) {
  } else {
    // emits('update:currentTime', audio.value?.currentTime)
    if (endTime.value !== 0 && audio.value) {
      percentage.value = audio.value?.currentTime / endTime.value * 100
    }
  }
}

// 监听是否停止
watch(playing, (v) => {
  if (audio.value) {
    if (v) {
      audio.value.play()
    } else {
      audio.value.pause()
    }
  }
})

// 监听拖动
const mouseUp = (newPer: number) => {
  percentage.value = newPer
  if (endTime.value !== 0) {
    audio.value && (audio.value.currentTime = newPer / 100 * endTime.value)
  }
}

if (volume != null && volume.value != null) {
  watch(volume, (v) => {
    audio.value && (audio.value.volume = v as number)
  })
}

// 播放结束后的行为
const ended = () => {
  props.ended && props.ended()
  if(playing.value) {
    percentage.value = 0
    audio.value?.play()
  }
}

// 已准备好的播放部分
const bgPercentage = ref(0)

const handler = setInterval(() => {
  if(audio.value) {
    const buffered = audio.value.buffered
    // console.log(buffered)
    if(buffered.length > 0) {
      bgPercentage.value = buffered.end(buffered.length - 1) / endTime.value * 100
    }
  }
}, 500)
onBeforeUnmount(() => {
  clearInterval(handler)
})
</script>
<style lang="scss">
.player-container {

  .inner-audio {
    display: none;
  }
}
</style>