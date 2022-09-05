<template>
  <div class="bottom-wrapper">
    <div class="l">
      <div class="cover-wrapper" @click="toggleSongPlane">
        <!-- todo -->
        <img class="song-cover" :src="currentCoverImg" alt="">
        <div class="hide-mask">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow-top-copy"></use>
          </svg>
        </div>
        <div class="info-wrapper">
          <div class="title">
            {{currentSongInfo?.name}}
          </div>
          <div class="artists">
            <ListCombine :list="artistList" #="{id}">
              <router-link :to="`/artistDetail/${id}`"></router-link>
            </ListCombine>
          </div>
        </div>
      </div>
      <div class="info-wrapper">
        <div class="title"></div>
        <div class="author"></div>
      </div>
    </div>
    <div class="c">
      <div class="control-wrapper">
        <div class="prev" @click="prev">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-prev"></use>
          </svg>
        </div>
        <div class="play" @click="play">
          <svg class="icon" aria-hidden="true" v-show="playing">
            <use xlink:href="#icon-pause"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-show="!playing">
            <use xlink:href="#icon-play"></use>
          </svg>
        </div>
        <div class="next" @click="next">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-next"></use>
          </svg>
        </div>
      </div>
      <div class="slider-wrapper">
        <div class="current-time">{{currentTimeFormat}}</div>
        <BPlayer 
          v-model:currentTime="currentTime" 
          v-model:endTime="endTime"
          :url="currentSongUrl"
          :playing="playing" />
        <div class="end-time">{{endTimeFormat}}</div>
      </div>
    </div>
    <div class="r">
      <button>list</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, toRef, watch } from 'vue';
import BPlayer from '@/components/BPlayer/index.vue'
import ListCombine, {API as ListAPI} from '@/components/Functional/ListCombine.vue';
import {usePlay} from '@/store/play'
import {convertTime} from '@/utils/NumberUtils'

const playStore = usePlay()
// 处理详情开闭
const opened = toRef(playStore, 'songPlaneOpened')
const toggleSongPlane = () => {
  opened.value = !opened.value
}

// 当前播放的音乐的信息，无信息时id是-1
const currentSongInfo = toRef(playStore, 'songInfo')

// 音乐文件url
const currentSongUrl = ref('')
// 音乐封面url
const currentCoverImg = ref('')
// 艺术家信息
const artistList = ref<ListAPI['listType'][]>([])
watch(currentSongInfo, async (v) => {
  if(v != null && v.id !== -1) {
    const urlRes = await playStore.getSongUrl(v.id)
    urlRes && urlRes.data.length > 0 && (currentSongUrl.value = urlRes.data[0].url)
    currentCoverImg.value = v.al.picUrl
    artistList.value = v.ar
  }
})


const currentTime = ref(0)
const endTime = ref(0)
const currentTimeFormat = computed(() => {
  return convertTime(currentTime.value * 1000).text
})
const endTimeFormat = computed(() => {
  return convertTime(endTime.value * 1000).text
})
const playing = toRef(playStore, 'playing')

// 播放相关按钮
const play = () => {
  playStore.togglePlaying()
}
const prev = () => {
  playStore.prevSong()
}
const next = () => {
  playStore.nextSong()
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
      display: flex;
      box-sizing: border-box;
      width: 280px;
      height: 100%;
      padding: 10px;
      .cover-wrapper {
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 5px;
        overflow: hidden;
        flex-shrink: 0;
        .song-cover {
          width: 100%;
          height:100%;
        }
        .hide-mask {
          position: absolute;
          box-sizing: border-box;
          padding: 10px;
          width: 100%;
          height:100%;
          left: 0;
          top: 0;
          visibility: hidden;
          background: rgba(0, 0, 0, 0.168);
          svg {
            fill: #fff;
            width: 100%;
            height:100%;
          }

        }

        &:hover .hide-mask {
          visibility: visible;
        }
      }

      .info-wrapper {
        
      }
    }

    .c {
      max-width: 500px;
      height: 100%;
      .control-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50%;

        &>div {
          font-size: 20px;
          width: 30px;
          height: 30px;
          margin: 0 10px;
          cursor: pointer;
          
          svg {
            height: 30px;
            width: 30px;
            box-sizing: border-box;
            padding: 3px;
            fill: var(--theme-fg);
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.11);
          }

          &:hover svg {
            fill: var(--plain-bg);
            background: rgba(255, 255, 255, 0.397);
          }
        }
      }

      .slider-wrapper {
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .current-time, .end-time {
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
</style>