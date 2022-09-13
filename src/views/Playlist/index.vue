<template>
  <div>
    <div class="head-container">
      <div class="cover-wrapper">
        <img :src="playlistDetail?.coverImgUrl" alt="">
      </div>
      <div class="info-wrapper">
        <h2 class="title">
          {{ playlistDetail?.name }}
        </h2>
        <div class="creator">
          {{ playlistDetail?.creator.nickname }}
        </div>
      </div>
    </div>

    <SongList :songList="songList"></SongList>

  </div>
</template>
<script lang="ts" setup>
import SongList from '@/components/SongList/index.vue'
import { Playlist, PlaylistDetailType } from '@/api/Playlist'
import { onBeforeUpdate, onMounted, ref, toRef, watch } from 'vue';
import { useRoute } from 'vue-router'
import { Song, SongType } from '@/api/Song';

const route = useRoute()

const songList = ref<SongType[]>([])
const playlistDetail = ref<PlaylistDetailType>()

const updateData = async () => {
  // https://neteasecloudmusicapi-docs.4everland.app/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e5%8d%95%e8%af%a6%e6%83%85
  const id = parseInt(route.params.id as string, 10)
  const some = await Playlist.playListDetail(id)
  if (some.code === 200) {
    playlistDetail.value = some.playlist
    const trackIdList = some.playlist.trackIds.map((v) => {
      return v.id
    })
    const songDetails = await Song.detail(trackIdList)
    songList.value = songDetails.songs

  }
}
onMounted(updateData)

const params = toRef(route, 'params')
watch(params, (v) => {
  updateData()
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