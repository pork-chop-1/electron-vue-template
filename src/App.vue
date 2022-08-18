<template>
  <div>
    <Header />
    <router-view id="router"></router-view>
    <Bottom />
  </div>
</template>
<script lang="ts" setup>
import Header from './components/Header/index.vue'
import Bottom from './components/Bottom/index.vue'
import {useUser} from '@/store/user'
const userStore = useUser()
userStore.getProfiles()
</script>
<style lang="scss">
#router {
  min-height: calc(100vh - 110px);
  position: relative;
}
</style>