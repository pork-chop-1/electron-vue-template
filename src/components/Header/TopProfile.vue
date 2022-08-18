<template>
  <div class="avatar-wrapper" @click="userClickHandler">
    <img :src="profile.userId !== -1 ? profile.avatarUrl : DefaultAvatar" alt="avatar">
  </div>
  <div class="username-wrapper">
    <div class="username" @click="userClickHandler">{{ profile.userId !== -1 ? profile.nickname : '未登录' }}</div>
  </div>
  <LoginModal v-model:visible="visible" />
</template>
<script lang="ts" setup>
import { ref, toRef } from 'vue'

import { useUser } from '@/store/user'
import LoginModal from '@/components/LoginModal/index.vue'
import DefaultAvatar from '../../assets/imgs/default-avatar.png'

// const DefaultAvatar = '../../assets/imgs/default-avatar.png'
const userStore = useUser()
const profile = toRef(userStore, 'profile')

const visible = ref(false)
const userClickHandler = () => {
  if(profile.value.userId === -1) {
    visible.value = true
  } else {
    // 下拉
  }
}

</script>
<style lang="scss">
.avatar-wrapper {
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  margin: 5px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;

  >img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
}

.username-wrapper {
  min-width: 50px;
  height: 40px;
  display: flex;
  align-items: center;

  .username {
    cursor: pointer;
  }
}
</style>