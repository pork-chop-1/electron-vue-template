<template>
  <div>
    <h2>最近播放</h2>
    <div class="playlist-wrapper">
      <BTable :columns="columns" :data-source="data">
        <template #bodyCell="{column, record}">
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
<script lang="ts" setup>
import { getRecentSong } from '@/api/User'
import { onMounted, ref } from 'vue';
import BTable from '@/components/BTable/index.vue'
import { type ColumnsType, type DataSourceType } from '@/components/BTable'
import { usePlay } from '@/store/play'
import ListCombine from '@/components/Functional/ListCombine.vue'

const columns: ColumnsType[] = [
  {
    key: 'title',
    title: '音乐标题',
  },
  {
    key: 'artists',
    title: '歌手'
  },
  {
    key: 'playTime',
    title: '播放时间'
  }
]

const data = ref<DataSourceType[]>([])

const playStore = usePlay()
const toggleSong = (id: number) => {
  // todo 直接添加进
  playStore.setSongId(id)
  playStore.setPlaneStatus(true)
}

onMounted(async () => {
  const res = await getRecentSong()

  if (res.code === 200) {
    data.value = res.data.list.map((v) => {
      return {
        key: v.data.id,
        playTime: convertPlayTime(v.playTime),
        title: v.data.name,
        artists: v.data.ar
      }
    })
  }
})

const convertPlayTime = (timestamp: number) => {
  const now = Date.now()
  const gap = now - timestamp
  if(gap < 1000 * 60 * 60) {
    return `${Math.round(gap / 1000 / 60)}分钟前`
  } else if (gap < 1000 * 60 * 60 * 24) {
    return `${Math.round(gap / 1000 / 60 / 60)}小时前`
  } else if (gap < 1000 * 60 * 60 * 24 * 2) {
    return `昨天`
  } else {
    return `${new Date(timestamp).toLocaleDateString()}`
  }

}
</script>
<style lang="scss">
</style>