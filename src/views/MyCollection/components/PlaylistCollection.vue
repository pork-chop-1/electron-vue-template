<template>
  <div>
    <div class="header">
      <div class="title">收藏的歌单</div>
      <div class="search-wrapper">
        <input type="text" placeholder="搜索收藏歌单">
      </div>

    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import BTable from '@/components/BTable/index.vue'
import { DataSourceType, ColumnsType } from '@/components/BTable';
import { getCollectedArtists } from '@/api/Artist';
import { Playlist } from '@/api/Playlist';
import useUser from '@/store/user'

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


const userStore = useUser()
onMounted(async () => {
  const res = await Playlist.getUserPlaylist(userStore.profile.userId)
  console.log(res)
  if(res.code === 200) {
    // data.value = res.data.map((v) => {
    //   return {
    //     key: v.id,
    //     cover: v.picUrl,
    //     name: v.name,
    //     albumCount: v.albumSize,
    //     mvCount: v.mvSize
    //   }
    // })
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