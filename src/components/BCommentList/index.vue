<template>
  <div class="comment-title">
    热门
  </div>
  <CommentList :loading="hotLoading" :listData="hotList" class="comment-container">
    <template #listItem="{ data }">
      <div class="comment-wrapper">
        <div class="l">
          <img :src="data.user.avatarUrl" class="avatar-img">
          <div class="nickname">{{ data.user.nickname }}</div>
        </div>
        <div class="r">
          <div class="comment-content">{{ data.content }}</div>
          <div class="like-count">{{ data.likedCount }}</div>
        </div>
      </div>
    </template>
  </CommentList>

  <BPagination v-model:current="current" :total="total"/>

</template>
<script lang="ts" setup>
import {Comment, SongCommentResType, SongCommentType} from '@/api/Comment'
import { onMounted, ref, toRef, watch } from 'vue';
import CommentList from './CommentList.vue';
import {BPagination} from '@/components/BPagination';

const props = defineProps<{
  songId?: number
}>()
const songId = toRef(props, 'songId')

type _songCommentWidthKeyType = SongCommentType & {key: number}

const hotLoading = ref(true)
const hotList = ref<_songCommentWidthKeyType[]>([])

const initSongComment = async () => {
  if(songId.value == null) {
    return
  }
  const res = await Comment.getSongComment(songId.value, 20, 0)
  if(res.code !== 200) {
    console.error(res)
    return
  }
  hotLoading.value = false
  hotList.value = res.hotComments.map(v => {
    return {key: v.commentId, ...v}
  })
}
watch(songId, v => {
  initSongComment()
})


// 分页
const current = ref(1)
const total = ref(500)
</script>
<style lang="scss">
.comment-container {
  width: 100%;
  position: relative;

  .comment-wrapper {
    width: 100%;
    position: relative;
    display: flex;
    .l {
      width: 130px;
      display: flex;
      align-items: center;
      flex-shrink: 0;

      .avatar-img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
      }
      .nickname {
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .r {

    }
  }
}
</style>
