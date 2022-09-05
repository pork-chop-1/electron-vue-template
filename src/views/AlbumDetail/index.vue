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
import {getLikeList} from '@/api/User'
import { onMounted } from 'vue';

onMounted(async () => {
  const some = await getLikeList()
  console.log(some)
})
</script>
<style lang="scss">
  
</style>