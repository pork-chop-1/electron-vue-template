<template>
  <div id="app-container">
    <Header />
    <div id="center">
      <LeftMenu />
      <div id="divide-line"></div>
      <router-view id="router"></router-view>
      <!-- 从底部弹出songDetail -->
      <SongDetail id="song-detail" :class="{opened}"/>
    </div>
    <Bottom />
  </div>
</template>
<script lang="ts" setup>
import {defineAsyncComponent, toRef} from 'vue'
import Header from '@/layout/Header/index.vue'
import Bottom from '@/layout/Bottom/index.vue'
import LeftMenu from '@/layout/LeftMenu/index.vue'
import {useUser} from '@/store/user'
import {usePlay} from '@/store/play'


const userStore = useUser()
userStore.getProfiles()

// 懒加载歌曲详情
const SongDetail = defineAsyncComponent(() => import('@/views/SongDetail/index.vue'))
// 处理详情开闭
const playStore = usePlay()
const opened = toRef(playStore, 'songPlaneOpened')
</script>
<style lang="scss">
#app-container {
  overflow: hidden;
}
#center {
  height: calc(100vh - 110px);
  position: relative;
  display: flex;
  overflow: hidden;
  #router{
    display: inline-block;
    width: calc(100% - 200px);
    overflow: hidden auto;
  }
  #divide-line {
    width: 2px;
    background-color: var(--divide-line-fg);
    height: 100%;
  }

  #song-detail {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden auto;
    left: 0;
    top: 100%;
    transition: top .5s;

    &.opened {
      top: 0;
    }
  }
}
</style>