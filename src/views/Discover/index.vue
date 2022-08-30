<template>
  <div>
    <div class="playlist-related">
      <div class="playlist-wrapper">
        <div class="playlist-img-wrapper">
          <div class="daily-img-holder">
            <div class="daily-date-wrapper">
              {{dayNumber}}
            </div>
          </div>
          <router-link to="/DayRecommend"></router-link>
        </div>
        <div class="playlist-title-wrapper">
          <router-link to="/DayRecommend">
            每日歌曲推荐
          </router-link>
        </div>
      </div>
      <div class="playlist-wrapper" v-for="item in recommendPlayList" :key="item.id">
        <div class="playlist-img-wrapper">
          <img class="playlist-img-holder" :src="item.coverImgUrl">
          <router-link :to="'/playlist/' + item.id"></router-link>
        </div>
        <div class="playlist-title-wrapper">
          <router-link :to="'/playlist/' + item.id">
            {{  item.name  }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type PlaylistType, Playlist } from '@/api/Playlist/index'
import { onMounted, Ref, ref } from 'vue';
import { useRouter } from 'vue-router'
import {fillZero} from '@/utils/NumberUtils'
const router = useRouter()

const dayNumber = ref(fillZero(new Date().getDate(), 2))

let recommendPlayList: Ref<PlaylistType[] | []> = ref([])
onMounted(async () => {
  recommendPlayList.value = (await Playlist.highquality(9)).playlists
  console.log(recommendPlayList)
})

</script>

<style lang="scss">
.playlist-related {
  max-width: 1200px;
  min-width: 600px;
  width: 100%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);

  .playlist-wrapper {
    padding: 10px;

    .daily-img-holder {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      border-radius: 5px;
      overflow: hidden;
      .daily-date-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        background: linear-gradient(45deg, rgb(46, 53, 87), rgb(13, 95, 101));
        color: #fff;
      }
    }

    .playlist-img-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      border-radius: 5px;
      overflow: hidden;

      .playlist-img-holder{
        width: 100%;
      }
      a {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
      }
    }

    .playlist-title-wrapper {
      width: 100%;
      height: 44px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      
      & :hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
