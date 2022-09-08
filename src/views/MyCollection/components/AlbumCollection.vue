<template>
  <div>
    <div class="header">
      <div class="title">收藏的专辑</div>
      <div class="search-wrapper">
        <input type="text" placeholder="搜索收藏专辑">
      </div>

      <BTable :columns="columns" :data-source="data" :is-hide-header="true">
        <template #bodyCell="{column, record}">
          <template v-if="column.key === 'cover'">
            <img class="cover-img" :src="record.cover" alt="">
          </template>
          <template v-else-if="column.key === 'title'">
            <router-link :to="`/albumDetail/${record.key}`"></router-link>
              {{record.title }}
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
            {{ record[column.key] }}首
          </template>
        </template>
      </BTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getCollectedAlbums } from '@/api/Album';
import { onMounted, ref } from 'vue';
import BTable from '@/components/BTable/index.vue'
import { DataSourceType, ColumnsType } from '@/components/BTable';
import ListCombine from '@/components/Functional/ListCombine.vue'

const columns: ColumnsType[] = [
  {
    key: 'cover',
    title: '封面',
  },
  {
    key: 'title',
    title: '标题',
  },
  {
    key: 'artists',
    title: '歌手'
  },
  {
    key: 'count',
    title: '数量'
  }
]
const data = ref<DataSourceType[]>([])

onMounted(async () => {
  const res = await getCollectedAlbums()
  
  if(res.code === 200) {
    data.value = res.data.map((v) => {
      return {
        key: v.id,
        count: v.size,
        artists: v.artists,
        cover: v.picUrl,
        title: v.name
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