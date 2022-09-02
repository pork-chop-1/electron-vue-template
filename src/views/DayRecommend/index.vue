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
            <!-- 处理列表中的歌曲名称 -->
            <template v-if="column.key === 'title'">
              <a @click.prevent="toggleSong(record.id)">
                {{record.title }}
              </a>
            </template>

            <!-- 处理列表中的艺术家 -->
            <template v-else-if="column.key === 'artists'">
              <!-- 艺术家是一个列表 -->
              <template 
                v-for="artistInfo, index in record.artists"
                :key="artistInfo.id"
              >
                <router-link :to="`/artistDetail/${artistInfo.id}`">
                  {{artistInfo.name}}
                </router-link>
                <!-- 分离字符最后一个不显示 -->
                <span v-show="index + 1 !== record.artists.length">/</span>
              </template>
            </template>

            <!-- 处理列表中的专辑 -->
            <template v-else-if="column.key === 'album'">
              <router-link :to="`/albumDetail/${record.album.id}`">
                {{record.album.name }}
              </router-link>
            </template>
            <template v-else>
              {{ record[column.key] }}
            </template>
        </template>
      </BTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fillZero, convertTime } from '@/utils/NumberUtils';
import { Playlist } from '@/api/Playlist'
import BTable from '@/components/BTable/index.vue'
import { DataSourceType } from '@/components/BTable';
import { usePlay } from '@/store/play'

const dateNumber = ref(fillZero(new Date().getDate(), 2))

const columns = ref([
  {
    title: '音乐标题',
    key: 'title'
  },
  {
    title: '歌手',
    key: 'artists'
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

const data = ref<DataSourceType[] | []>([
])

onMounted(async () => {
  const some = await Playlist.recommendSongs()
  console.log(some)
  data.value = some.data.dailySongs.map(v => {
    return {
      key: v.name,
      title: v.name,
      artists: v.ar,
      album: v.al,
      length: convertTime(v.dt).text,
      id: v.id
    }
  })
})

// 点击songName

const playStore = usePlay()
const toggleSong = (id: string) => {
  playStore.setSongId(id)
  playStore.setPlaneStatus(true)
}

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