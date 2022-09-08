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
      </div>
      <div class="info-wrapper">
        <div class="title">
          {{  currentSongInfo?.name  }}
        </div>
        <div class="artists">
          <ListCombine :list="artistList" #="{ id, item }">
            <router-link :to="`/artistDetail/${id}`">{{item.name}}</router-link>
          </ListCombine>
        </div>
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
        <div class="current-time">{{  currentTimeFormat  }}</div>
        <BPlayer 
          v-model:currentTime="currentTime" 
          v-model:endTime="endTime" 
          :url="currentSongUrl" 
          :playing="playing"
          :volume="volume / 100"
          :ended="ended" />
        <div class="end-time">{{  endTimeFormat  }}</div>
      </div>
    </div>
    <div class="r">
      <!-- 音量控制 -->
      <div class="volume-control">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-soundsize"></use>
        </svg>
        <div class="volume-container">
          <Slider v-model:percentage="volume" orientation="vertical" :width="70" :height="5" />
        </div>
      </div>
      <!-- 播放模式 -->
      <div class="play-mode-control" @click="togglePlayMode">
        <svg class="icon" aria-hidden="true" v-show="playMode==='cycle'">
          <use xlink:href="#icon-list-circle"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-show="playMode==='single'">
          <use xlink:href="#icon-singlecycle"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-show="playMode==='random'">
          <use xlink:href="#icon-random"></use>
        </svg>
      </div>
      <!-- 当前列表 -->
      <div class="current-playlist" @click="toggleCurrentPlaylistVisible">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-musiclist"></use>
        </svg>
      </div>
    </div>
    <BDrawer v-model:visible="currentPlaylistVisible" :get-container="'#center'" >
      <CurrentPlayList />
    </BDrawer>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, toRef, watch } from 'vue';
import BPlayer from '@/components/BPlayer/index.vue'
import ListCombine, { API as ListAPI } from '@/components/Functional/ListCombine.vue';
import { usePlay } from '@/store/play'
import { convertTime } from '@/utils/NumberUtils'
import Slider from '@/components/Slider/index.vue';
import BDrawer from '@/components/BDrawer/index.vue'
import CurrentPlayList from './CurrentPlayList/index.vue'

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
  if (v != null && v.id !== -1) {
    const urlRes = await playStore.getSongUrl(v.id)
    urlRes && urlRes.data.length > 0 && (currentSongUrl.value = urlRes.data[0].url)
    currentCoverImg.value = v.al.picUrl
    artistList.value = v.ar
  }
})


const currentTime = toRef(playStore, 'currentTime')
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

// 音量相关
const volume = toRef(playStore, 'volume')

// 播放完成
const ended = () => {
  playStore.playCompleted()
}

// 右边当前列表
const currentPlaylistVisible = ref(false)
const toggleCurrentPlaylistVisible = () => {
  currentPlaylistVisible.value = !currentPlaylistVisible.value
}

// 播放模式相关
const playMode = toRef(playStore, 'playMode')
const togglePlayMode = toRef(playStore, 'togglePlayMode')
</script>
<style lang="scss" scoped>
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
      display: flex;

      .song-cover {
        width: 100%;
        height: 100%;
      }

      .hide-mask {
        position: absolute;
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        visibility: hidden;
        background: rgba(0, 0, 0, 0.168);

        svg {
          fill: #fff;
          width: 100%;
          height: 100%;
        }

      }

      &:hover .hide-mask {
        visibility: visible;
      }
    }

    .info-wrapper {
      margin: 0 0 0 10px;
      width: 200px;
      height: 50px;

      .title {
        font-size: 20px;
        overflow: hidden;
      }

      .artists {
        overflow: hidden;
        &>a {
          color: #fff
        }
      }
    }
  }

  .c {
    max-width: 500px;
    height: 100%;
    margin-left: auto;

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

      .current-time,
      .end-time {
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .r {
    display: flex;
    margin-left: auto;
    .volume-control, .current-playlist, .play-mode-control {
      position: relative;
      margin-right: 10px;
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

      .volume-container {
        // display: none;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s linear 0.3s, opacity 0.3s linear;
        display: flex;
        position: absolute;
        width: 100px;
        height: 40px;
        align-items: center;
        justify-content: center;
        background: #fff;
        top: -83px;
        left: -35px;
        box-shadow: 0 0 8px #00000027;
        border-radius: 5px;
        transform: rotate(-90deg);
      }

      &:hover .volume-container {
        // display: flex;
        visibility: visible;
        opacity: 1;
        transition-delay: 0s;
      }
    }

  }
}
</style>