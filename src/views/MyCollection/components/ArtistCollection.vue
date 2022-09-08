<template>
  <div>
    <div class="header">
      <div class="title">收藏的歌手</div>
      <div class="search-wrapper">
        <input type="text" placeholder="搜索收藏歌手">
      </div>

      <BTable :columns="columns" :data-source="data" :is-hide-header="true">
        <template #bodyCell="{column, record}">
          <template v-if="column.key === 'cover'">
            <img class="cover-img" :src="record.cover" alt="">
          </template>
          <template v-else-if="column.key === 'name'">
            <router-link :to="`/artistDetail/${record.id}`">
              {{record.name}}
            </router-link>
          </template>
          <template v-else-if="column.key === 'albumCount'">
            专辑数: {{record.albumCount}}
          </template>
          <template v-else-if="column.key === 'mvCount'">
            MV数: {{record.mvCount}}
          </template>
        </template>
      </BTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import BTable from '@/components/BTable/index.vue'
import { DataSourceType, ColumnsType } from '@/components/BTable';
import { getCollectedArtists } from '@/api/Artist';

const columns: ColumnsType[] = [
  {
    key: 'cover',
    title: '封面',
  },
  {
    key: 'name',
    title: '名字',
  },
  {
    key: 'albumCount',
    title: '专辑数'
  },
  {
    key: 'mvCount',
    title: 'mv数量'
  }
]
const data = ref<DataSourceType[]>([])

onMounted(async () => {
  const res = await getCollectedArtists()
  
  if(res.code === 200) {
    data.value = res.data.map((v) => {
      return {
        key: v.id,
        cover: v.picUrl,
        name: v.name,
        albumCount: v.albumSize,
        mvCount: v.mvSize
      }
    })
  }
})
</script>
<style lang="scss" scoped>
  
  .cover-img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    overflow: hidden;
  }
</style>