<template>
  <div>
    <div class="header">
      <div class="date-icon-wrapper">
        <svg class="icon date-icon" aria-hidden="true">
          <use xlink:href="#icon-Calendar"></use>
        </svg>
        <div class="date-number">{{  dateNumber  }}</div>
      </div>
      <div class="recommend-info">
        <h2>
          每日歌曲推荐
        </h2>
        <p>
          根据你的音乐口味生成，每天6:00更新
        </p>
      </div>
    </div>
    <SongList :songList="songList"></SongList>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fillZero, convertTime } from '@/utils/NumberUtils';
import { Playlist } from '@/api/Playlist'
import { DataSourceType } from '@/components/BTable';
import { SongType } from '@/api/Song';
import SongList from '@/components/SongList/index.vue'

const dateNumber = ref(fillZero(new Date().getDate(), 2))

const data = ref<DataSourceType[]>([
])

const songList = ref<SongType[]>([])

onMounted(async () => {
  const some = await Playlist.recommendSongs()
  songList.value = some.data.dailySongs
})

</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  display: flex;

  .date-icon-wrapper {
    width: 100px;
    height: 100px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .date-icon {
      font-size: 70px;
      fill: var(--theme-bg);
    }

    .date-number {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      font-size: 50px;
      color: var(--theme-bg);
      text-align: center;
      box-sizing: border-box;
      padding-top: 20px;
    }
  }

  .recommend-info {
    height: 100px;
    margin-left: 20px;

    h2 {
      line-height: 50px;
      margin: 10px 0 0;
    }
  }
}
</style>