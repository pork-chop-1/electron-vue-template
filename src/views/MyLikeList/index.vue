<template>
  <div>
    <div class="head-container">
      <div class="cover-wrapper">
        <img :src="''" alt="">
      </div>
      <div class="info-wrapper">
        <h2 class="title">
          {{  }}
        </h2>
        <div class="creator">
          {{  }}
        </div>
      </div>
    </div>

    <SongList :songList="songList"></SongList>

  </div>
</template>
<script lang="ts" setup>
import SongList from '@/components/SongList/index.vue'
import { Playlist, PlaylistDetailType } from '@/api/Playlist'
import { onBeforeUpdate, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { Song, SongType } from '@/api/Song';
import { getLikeList } from '@/api/User';

const route = useRoute()

const songList = ref<SongType[]>([])
onMounted(async () => {
  const some = await getLikeList()
  console.log(some)
  if (some.code === 200) {
    const likeList = some.ids
    const songDetails = await Song.detail(likeList.splice(0, 100))
    songList.value = songDetails.songs

  }
})

onBeforeUpdate(() => {

})
</script>
<style lang="scss" scoped>
.head-container {
  width: 100%;
  height: 200px;
  // box-sizing: border-box;
  padding: 10px;
  display: flex;

  .cover-wrapper {
    width: 200px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;

    >img {
      width: 200px;
      height: 200px;
    }
  }

  .info-wrapper {
    height: 100px;

    .title {
      font-size: 26px;
      font-weight: 700;

    }

    .creator {
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>