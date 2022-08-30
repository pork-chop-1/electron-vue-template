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
    <div class="playlist-container">
      <BTable :columns="columns" :data-source="data">
        <template #bodyCell="{ column, record }">
            {{  record.name  }}
        </template>
      </BTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fillZero } from '@/utils/NumberUtils';
import { Playlist, SongType } from '@/api/Playlist'
import BTable from '@/components/BTable/index.vue'

const dateNumber = ref(fillZero(new Date().getDate(), 2))

const columns = ref([
  {
    title: '音乐标题',
    key: 'title'
  },
  {
    title: '歌手',
    key: 'artist'
  },
  {
    title: '专辑',
    key: 'album'
  },
  {
    title: '时长',
    key: 'length'
  },
])

type DataSourceType = {
  key: number | string,
  [otherKey: string]: any
}
const data = ref<DataSourceType[] | []>([
  {
      key: 'v.name',
      title: 'v.name',
      artist: 'v.ar[0]?.name',
      album: 'v.al.name',
      length: 'v.dt'
    }
])

onMounted(async () => {
  const some = await Playlist.recommendSongs()
  console.log(some)
  data.value = some.data.dailySongs.map(v => {
    return {
      key: v.name,
      title: v.name,
      artist: v.ar[0]?.name,
      album: v.al.name,
      length: v.dt
    }
  })
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