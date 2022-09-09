<template>
  <div class="own-container">
    <div class="title" @click="ownPlayListsOpened = !ownPlayListsOpened">
      创建的列表
    </div>
    <ul class="list-wrapper" :class="{opened: ownPlayListsOpened}">
      <li 
        class="list-item" 
        v-for="item in ownPlayLists" 
        :key="item.id"
        :title="item.name"
        @click="directPlaylist(item.id)"
      >
        {{item.name}}
      </li>
    </ul>
  </div>
  <div class="subs-container">
    <div class="title" @click="subsPlayListsOpened = !subsPlayListsOpened">
      创建的列表
    </div>
    <ul class="list-wrapper" :class="{opened: subsPlayListsOpened}">
      <li 
        class="list-item" 
        v-for="item in subsPlayLists" 
        :key="item.id"
        @click="directPlaylist(item.id)"
      >
        {{item.name}}
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { Playlist, UserPlaylistsType } from '@/api/Playlist';
import useUser from '@/store/user';
import { useRouter } from 'vue-router';
import { onMounted, ref, toRef, watch } from 'vue';

// 创建的列表
const ownPlayLists = ref<UserPlaylistsType[]>([])
const ownPlayListsOpened = ref(true)
// 收藏的列表
const subsPlayLists = ref<UserPlaylistsType[]>([])
const subsPlayListsOpened = ref(true)
const userStore = useUser()

const userProfile = toRef(userStore, 'profile')
// 当uid变化时获取列表
watch(userProfile, (v) => {
  getPlayList(v.userId)
})
const getPlayList = async (userId: number) => {
  // 在uid为-1时不操作
  if(userId !== -1) {
    const res = await Playlist.getUserPlaylist(userId)
    // console.log(res)
    if(res.code === 200) {
      res.playlist.map((v) => {
        if(v.creator.userId === userId) {
          ownPlayLists.value.push(v)
        } else {
          subsPlayLists.value.push(v)
        }
      })
    }
  }
}
// 初始化的时候获取列表
onMounted(async () => {
  const userId = userStore.profile.userId
  getPlayList(userId)
})

// 跳转
const router = useRouter()
const directPlaylist = (id: number) => {
  router.push(`/playlistDetail/${id}`)
}
</script>
<style lang="scss" scoped>
.title {
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 15px 0 0 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 300;
}

.list-wrapper {
  width: 100%;
  overflow: hidden;
  transition: .3s;
  max-height: 0;
  
  &.opened {
    max-height: 1000px;
  }

  .list-item {
    width: 100%;
    height: 40px;
    font-size: 18px;
    padding: 0 0 0 12px;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &:hover {
      background: var(--hover-bg)
    }
  }
}
</style>