<template>
  <div class="song-container">
    <div class="title-wrapper">
      <div class="title">{{  songInfo?.name  }}</div>
      <div class="info-wrapper">
        <ListCombine :list="songArtists" v-slot="{ item, id }">
          <router-link :to="`/artistDetail/${id}`">
            {{  item.name  }}
          </router-link>
        </ListCombine>
        <span> - </span>
        <router-link :to="`/albumDetail/${songInfo?.al.id}`">
          {{ songInfo?.al.name }}
        </router-link>
      </div>
    </div>
    <div class="middle-wrapper">
      <div class="cover-wrapper">
        <img class="cover-pin" src="@/assets/imgs/pin.png" alt="">
        <div class="album-cover">
          <img class="ring-img" src="@/assets/imgs/ring.png" alt="">
          <img class="cover-img" :src="songInfo?.al.picUrl" alt="">
        </div>
      </div>
      <div class="lyrics-wrapper">

      </div>
      <div class="recommend-wrapper">

      </div>
    </div>
    <div class="comment-wrapper">
      <div class="comment-title">

      </div>
      <div class="insert-comment-wrapper">

      </div>
      <div class="comment-list">
        <BCommentList />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, toRef } from 'vue'
import { Song, SongType } from '@/api/Song'
import { usePlay } from '@/store/play'
import ListCombine from '@/components/Functional/ListCombine.vue';
import {BCommentList} from '@/components/BCommentList'

const playStore = usePlay()
const songInfo = toRef(playStore, 'songInfo')

const songArtists = computed(() => {
  if (songInfo.value == null) {
    return []
  } else {
    return songInfo.value.ar.map(v => { return { name: v.name, id: v.id.toString() } })
  }
}
)

// onMounted(async () => {
  // const songId = route.params.id
  // if (songId) {
  //   const res = await Song.detail(songId)
  //   if (res.songs.length > 0) {
  //     songInfo.value = res.songs[0]
  //   }
  // }
// })

</script>
<style lang="scss">
.song-container {
  width: 100%;
  background-color: var(--plain-bg);

  // 标题部分
  .title-wrapper {
    width: 100%;
    height: 100px;
    text-align: center;

    .title {
      margin: 10px 0;
      font-size: 30px;
      font-weight: 700;
    }

    .info-wrapper {
      font-size: 16px;
      font-weight: 400;
    }
  }

  .middle-wrapper {
    position: relative;
    min-width: 1200px;
    display: flex;

    .cover-wrapper {
      width: 300px;
      height: 400px;

      .cover-pin {
        width: 200px;
        height: 100px;
      }

      .album-cover {
        width: 300px;
        height: 300px;
        position: relative;

        .ring-img {
          position: absolute;
          width: 300px;
          height: 300px;
          z-index: 2;
        }

        .cover-img {
          position: absolute;
          width: 220px;
          height: 220px;
          left: 40px;
          top: 40px;
          border-radius: 50%;
        }
      }
    }

    .lyrics-wrapper {
      width: calc(100% - 600px);
      height: 400px;
    }

    .recommend-wrapper {
      width: 300px;
      height: 400px;
    }
  }

  .comment-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
