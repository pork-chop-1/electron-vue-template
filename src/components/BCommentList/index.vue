<template>
  <div class="comment-title">
    热门
  </div>
  <CommentList :loading="hotLoading" :listData="hotList" class="comment-container">
    <template #listItem="{ data }">
      <div class="comment-wrapper">
        <div class="l">
          <img :src="data.user.avatarUrl" class="avatar-img">
        </div>
        <div class="r">
          <div class="comment-content-wrapper">
            <span class="nickname">{{ data.user.nickname }}</span>
            <span> : </span>
            <span class="comment-content">{{ data.content }}</span>
          </div>
          <div class="like-count">{{ data.likedCount }}</div>
        </div>
      </div>
    </template>
  </CommentList>
  <div class="comment-title">
    最新
  </div>
  <CommentList :loading="newestLoading" :listData="newestList" class="comment-container">
    <template #listItem="{ data }">
      <div class="comment-wrapper">
        <div class="l">
          <img :src="data.user.avatarUrl" class="avatar-img">
        </div>
        <div class="r">
          <div class="comment-content-wrapper">
            <span class="nickname">{{ data.user.nickname }}</span>
            <span> : </span>
            <span class="comment-content">{{ data.content }}</span>
          </div>
          <div class="comment-bottom">
            <div class="timestamp">{{ data.timeStr }}</div>
            <div class="comment-panel">
              <div class="add-comment">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-comments"></use>
                </svg>
                评论
              </div>
              <div class="like-count">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-good-fill"></use>
                </svg>
                {{ data.likedCount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </CommentList>
  <BPagination v-model:current="current" :total="total" />

</template>
<script lang="ts" setup>
import { Comment, SongCommentResType, SongCommentType } from '@/api/Comment'
import { onMounted, ref, toRef, watch } from 'vue';
import CommentList from './CommentList.vue';
import { BPagination } from '@/components/BPagination';

const props = defineProps<{
  songId?: number
}>()
const songId = toRef(props, 'songId')

// 分页
const current = ref(1)
const total = ref(1)

type _songCommentWidthKeyType = SongCommentType & { key: number }

const hotLoading = ref(true)
const hotList = ref<_songCommentWidthKeyType[]>([])
const newestLoading = ref(true)
const newestList = ref<_songCommentWidthKeyType[]>([])

const initSongComment = async () => {
  if (songId.value == null) {
    return
  }
  const res = await Comment.getSongComment(songId.value, 20, 0)
  if (res.code !== 200) {
    console.error(res)
    return
  }
  hotLoading.value = false
  hotList.value = res.hotComments.map(v => {
    return { key: v.commentId, ...v }
  })
  newestLoading.value = false
  newestList.value = res.comments.map(v => {
    return { key: v.commentId, ...v }
  })
  total.value = res.total
}

// 页数改变
watch(current, async v => {
  if (songId.value == null) {
    return
  }
  hotLoading.value = true
  const res = await Comment.getSongComment(songId.value, 20, (v - 1) * 20)
  hotLoading.value = false
  if (res.code !== 200) {
    console.error(res)
    return
  }
  newestList.value = res.comments.map(v => {
    return { key: v.commentId, ...v }
  })
})

watch(songId, v => {
  initSongComment()
})


</script>
<style lang="scss" scoped>
.comment-title {
  font-size: 16px;
}

.comment-container {
  width: 100%;
  position: relative;

  .comment-wrapper {
    width: 100%;
    position: relative;
    display: flex;
    margin: 10px 0;

    .l {
      width: 60px;
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
    }

    .r {
      width: 100%;
      .comment-content-wrapper {
        font-size: 14px;
        margin: 0 0 10px 0;

        .nickname {
          white-space: nowrap;
          overflow: hidden;
          color: #0b58b0;
        }
      }

      .comment-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .timestamp {
          font-size: 14px;
          color: #999999;
        }

        .comment-panel{
          display: flex;
          align-items: center;

          .add-comment, .like-count {
            display: flex;
            align-items: center;
          }
        }

        .icon {
          width: 16px;
          height: 16px;
        }
      }

    }
  }

  // 分割线
  &>*:not(:last-child) .comment-wrapper::after {
    content: ' ';
    border-top: 1px solid #f2f2f2;
    width: 100%;
    height: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    // transform: translateX(12.5%)
  }
}
</style>
