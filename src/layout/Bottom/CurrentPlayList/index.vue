<template>
  <div id="current-playlist-container">
    <h2>当前播放</h2>
    <div class="info-wrapper">
      共{{ songList.length }}首
    </div>
    <div class="playlist-wrapper">
      <BTable :is-hide-header="true" :columns="columns" :data-source="data">
        <template #bodyCell="{column, record}">
          <!-- 处理列表中的歌曲名称 -->
          <template v-if="column.key === 'title'">
            <a @click.prevent="toggleSong(record.id)">
              {{record.title }}
            </a>
          </template>
          
          <!-- 处理列表中的艺术家 -->
          <template v-else-if="column.key === 'artists'">
            <ListCombine :list="record.artists" #="{ id, item }">
              <router-link :to="`/artistDetail/${id}`">
                {{item.name}}
              </router-link>
            </ListCombine>
          </template>
          <template v-else>
            {{ record[column.key] }}
          </template>
        </template>
      </BTable>
    </div>
  </div>

</template>
<script lang="ts" setup >
import { usePlay } from '@/store/play'
import { computed, toRef } from 'vue';
import BTable from '@/components/BTable/index.vue'
import { type ColumnsType, type DataSourceType } from '@/components/BTable'
import ListCombine from '@/components/Functional/ListCombine.vue'
import { convertTime } from '@/utils/NumberUtils';

const playStore = usePlay()

const songList = toRef(playStore, 'songList')

const columns: ColumnsType[] = [
  {
    key: 'title',
    title: 'title',
  },
  {
    key: 'artists',
    title: 'artists'
  },
  {
    key: 'duration',
    title: 'duration'
  }
]
const data = computed<DataSourceType[]>(() => {
  return songList.value.map((v) => {
    return {
      key: v.id,
      title: v.name,
      artists: v.ar,
      duration: convertTime(v.dt).text,
    }
  })
})

const toggleSong = (id: number) => {
  playStore.setSongId(id)
  playStore.setPlaneStatus(true)
}
</script>
<style lang="scss">
  #current-playlist-container {
    position: relative;
    width: 100%;
    height: 100%;
    h2 {
      height: 30px;
    }
    
    .info-wrapper {
      height: 30px;
    }

    .playlist-wrapper {
      height: calc(100% - 60px);
      overflow: auto;
    }
  }

</style>