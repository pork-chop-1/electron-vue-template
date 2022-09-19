<template>
  <div>
    <h1>
      搜索 {{keyword}}
    </h1>
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
import { getSearchRes } from '@/api/Search';
import { onMounted, ref, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import AlbumSearch from './components/AlbumSearch.vue'
import ArtistSearch from './components/ArtistSearch.vue'
import PlaylistSearch from './components/PlaylistSearch.vue'
import SongSearch from './components/SongSearch.vue'

const route = useRoute()

const keyword = ref(route.params.keyword)


const navList = shallowRef([
  {
    name: '专辑',
    component: AlbumSearch,
    id: 'album'
  },
  {
    name: '歌手',
    component: ArtistSearch,
    id: 'artist'
  },
  {
    name: '歌单',
    component: PlaylistSearch,
    id: 'playlist'
  },
  {
    name: '单曲',
    component: SongSearch,
    id: 'song'
  },
])

const activeComponent = shallowRef(SongSearch)
const activeIndex = ref('song')

const toggleActive = (id: string) => {
  const item = navList.value.find((v) => v.id === id)
  if(item) {
    activeIndex.value = item.id
    activeComponent.value = item.component
  }
}

const getSearchResult = async () => {
  const res = await getSearchRes(keyword.value as string)
  console.log(res)
}
watch(keyword, getSearchResult)
onMounted(() => {
  getSearchResult()
})
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