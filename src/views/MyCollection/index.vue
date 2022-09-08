<template>
  <div>
    <div class="nav-bar">
      <div 
        class="nav-item"
        v-for="item in navList" 
        :key="item.id"
        @click="toggleActive(item.id)"
        :class="{active: activeIndex === item.id}"
        >
        {{item.name}}
      </div>
    </div>
    <div class="component-container"> 
      <component :is="activeComponent"></component>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import AlbumCollection from './components/AlbumCollection.vue'
import ArtistCollection from './components/ArtistCollection.vue'
import PlaylistCollection  from './components/PlaylistCollection.vue'

const navList = shallowRef([
  {
    name: '专辑',
    component: AlbumCollection,
    id: 'album'
  },
  {
    name: '歌手',
    component: ArtistCollection,
    id: 'artist'
  },
  {
    name: '歌单',
    component: PlaylistCollection,
    id: 'playlist'
  },
])

const activeComponent = shallowRef(AlbumCollection)
const activeIndex = ref('album')

const toggleActive = (id: string) => {
  const item = navList.value.find((v) => v.id === id)
  if(item) {
    activeIndex.value = item.id
    activeComponent.value = item.component
  }
}
</script>
<style lang="scss">
  .nav-bar {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;

    .nav-item {
      line-height: 24px;
      font-size: 20px;
      padding: 10px;
      cursor: pointer;
      
      &.active {
        font-weight: 700;
        text-decoration: 4px underline var(--theme-bg);
      }
    }
  }
</style>