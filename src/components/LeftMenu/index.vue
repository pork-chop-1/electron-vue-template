<template>
  <div id="left-menu">
    <div class="menu-header">我的音乐</div>
    <div class="menu-item" v-for="item in staticRoutes" :key="item.name" @click="clickHandler(item.path)">{{item.meta?.description}}</div>
    <!-- <div class="menu-item">私人FM</div> -->
  </div>
</template>
<script lang="ts" setup>
import {staticRoutes} from '@/router/staticPage'
import {useRouter} from 'vue-router'
// const topMenu = {}
const router = useRouter()
const clickHandler = (path: string) => {
  router.push(path)
}
</script>
<style lang="scss">
  #left-menu {
    width: 200px;
    height: 100%;
    position: relative;
    overflow: hidden auto;

    .menu-item {
      box-sizing: border-box;
      width: 100%;
      height: 45px;
      display: flex;
      align-items: center;
      padding: 0 0 0 20px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        background-color: var(--hover-bg);
      }
    }

    .menu-header {
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
  }
</style>