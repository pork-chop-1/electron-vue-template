<template>
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
</template>
<script lang="ts" setup>
import { computed, ref, toRef } from 'vue';
import BTable from '@/components/BTable/index.vue'
import { DataSourceType } from '@/components/BTable';
import { usePlay } from '@/store/play'
import { SongType } from '@/api/Song';
import { convertTime } from '@/utils/NumberUtils';


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

const props = defineProps<{
  songList: SongType[]
}>()

const songList = toRef(props, 'songList')

const data = computed<DataSourceType[]>(() => {
  return songList.value.map(v => {
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
const toggleSong = (id: number) => {
  playStore.setSongList(songList.value)
  playStore.setSongId(id)
  playStore.setPlaneStatus(true)
}

</script>
<style lang="scss" scoped>
</style>