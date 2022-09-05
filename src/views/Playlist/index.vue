<template>
  <div>
    <div class="head-container">
      <div class="cover-wrapper">
        <img src="" alt="">
      </div>
      <h2 class="title">

      </h2>
      <div class="creator"></div>
    </div>

    <!-- <SongList :songList="songList"></SongList> -->
    
  </div>
</template>
<script lang="ts" setup>
import SongList from '@/components/SongList/index.vue'
import {Playlist} from '@/api/Playlist'
import { onMounted } from 'vue';
import {useRoute} from 'vue-router'

const route = useRoute()
onMounted(async () => {
  // https://neteasecloudmusicapi-docs.4everland.app/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e5%8d%95%e8%af%a6%e6%83%85
  const id = parseInt(route.params.id as string, 10)
  const some = await Playlist.playListDetail(id)
  console.log(some)
})
</script>
<style lang="scss">
  
</style>