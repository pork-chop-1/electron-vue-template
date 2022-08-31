<template>
  <div>
    <Header />
    <div id="center">
      <LeftMenu />
      <div id="divide-line"></div>
      <router-view id="router"></router-view>
    </div>
    <Bottom />
  </div>
</template>
<script lang="ts" setup>
import Header from '@/layout/Header/index.vue'
import Bottom from '@/layout/Bottom/index.vue'
import LeftMenu from '@/layout/LeftMenu/index.vue'
import {useUser} from '@/store/user'
const userStore = useUser()
userStore.getProfiles()
</script>
<style lang="scss">
#center {
  height: calc(100vh - 110px);
  position: relative;
  display: flex;
  #router{
    display: inline-block;
    width: calc(100% - 200px);
    overflow: hidden auto;
  }
  #divide-line {
    width: 2px;
    background-color: var(--divide-line-fg);
    height: 100%;
  }
}
</style>