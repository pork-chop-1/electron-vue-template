<template>
  <div>
    <div class="playlist-related">
      <div class="playlist-wrapper">
        <div class="playlist-img-wrapper">
          <div class="daily-img-holder">
            <div class="daily-date-wrapper">
              {{ dayNumber }}
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
        <div class="playlist-img-wrapper" ref="playlistWrapper">
          <img class="playlist-img-holder" :src="item.coverImgUrl">
          <router-link :to="'/playlist/' + item.id"></router-link>
        </div>
        <div class="playlist-title-wrapper">
          <router-link :to="'/playlist/' + item.id">
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type PlaylistType, Playlist } from '@/api/Playlist/index'
import { onMounted, Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import { fillZero } from '@/utils/NumberUtils'
import useClickMenu from '@/hooks/useClickMenu'
import usePlay from '@/store/play';
import { Song } from '@/api/Song';
// import {}
const router = useRouter()
let visible: Ref<boolean> = ref(false)
const playStore = usePlay()
const menuInfo = ref([
  {
    name: '查看列表',
    key: 'openList',
    clickHandler(name: string, key: string, extra: any) {
      // 打开列表同等功能
      let id = extra.target.hash.split('/')
      router.push('/playlist/' + id[id.length - 1])
    }
  },
  {
    name: '播放',
    key: 'play',
    async clickHandler(name: string, key: string, extra: any) {
      let id = extra.target.hash.split('/')
      id = id[id.length - 1]

      // 获取歌曲列表信息
      const some = await Playlist.playListDetail(id)
      if (some.code === 200) {
        const trackIdList = some.playlist.trackIds.map((v) => {
          return v.id
        })
        const songDetails = await Song.detail(trackIdList)
        const songList = songDetails.songs
        playStore.setSongList(songList)
        playStore.setSongId(id)
        playStore.setPlaneStatus(true)

        visible && (visible.value = false)
      }
    }
  },
  {
    name: '收藏()',
    key: 'in',
  },
])

const playlistWrapper = ref<HTMLElement[]>()
watch(playlistWrapper, (v) => {
  if (playlistWrapper.value != null) {
    useClickMenu(menuInfo, playlistWrapper as Ref<HTMLElement[]>, {visible})
  }
}, {})


const dayNumber = ref(fillZero(new Date().getDate(), 2))

let recommendPlayList: Ref<PlaylistType[] | []> = ref([])
onMounted(async () => {
  recommendPlayList.value = (await Playlist.highquality(9)).playlists
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

      .playlist-img-holder {
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
