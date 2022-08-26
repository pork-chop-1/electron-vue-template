<template>
  <div id="header-container">
    <div id="logo"></div>
    <ul class="menu">
      <li>
        <div class="top-menu" @click="newWindow">new</div>
      </li>
      <li>
        <div class="top-menu">about</div>
      </li>
    </ul>
    <div class="center">
      <TopSearch />
    </div>
    <div class="right">
      <TopProfile />
      <button @click="minimize" id="minimize">
        <minus-outlined />
      </button>
      <button @click="maximize" id="maximize">
          <svg class="icon key-button" aria-hidden="true" v-show="!isMaximized">
            <use xlink:href="#icon-3zuidahua-1"></use>
          </svg>
          <svg class="icon key-button" aria-hidden="true" v-show="isMaximized">
            <use xlink:href="#icon-3zuidahua-3"></use>
          </svg>
        <!-- <fullscreen-outlined v-show="!isMaximized" />
        <fullscreen-exit-outlined v-show="isMaximized" /> -->
      </button>
      <button @click="close" id="close">
        <close-outlined />
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRef } from 'vue'
import {
  CloseOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  MinusOutlined
} from '@ant-design/icons-vue';
import TopProfile from './TopProfile.vue';
import TopSearch from './TopSearch.vue';
// right buttons
const isMaximized = ref(false)
isMaximized.value = window.electronAPI.isMaximized()

const newWindow = () => {
  console.log('handler')
  window.electronAPI.setTitle('title')
}

const close = () => {
  console.log('close')
  window.electronAPI.closeWindow()
}

const minimize = () => {
  console.log('minimize')
  window.electronAPI.setMinimize()
}

const maximize = () => {
  console.log('maximize')
  isMaximized.value = window.electronAPI.toggleMaximize()
}

window.electronAPI.isMaximizedInfo((_event, value) => {
  isMaximized.value = value
  console.log(value, 'value')
})
</script>
<style lang="scss">
#header-container {
  width: 100%;
  height: 40px;
  background: var(--theme-bg);
  color: var(--theme-fg);
  -webkit-app-region: drag;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .menu {
    margin: 0;
    display: flex;

    >li {
      padding: 0;
      width: 50px;
      height: 40px;
      display: flex;
      user-select: none;
      list-style: none;
      -webkit-app-region: no-drag;
      cursor: default;

      .top-menu {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background: var(--theme-bg-selected);
        }
      }
    }
  }
  .center {
    -webkit-app-region: no-drag;
  }
  .right {
    -webkit-app-region: no-drag;
    margin-left: auto;
    display: flex;
    
    >button {
      border: none;
      width: 40px;
      height: 40px;
      background: inherit;
      display: flex;
      align-items: center;
      justify-content: center;

      &#close:hover {
        background: var(--theme-bg-danger)
      }

      &:hover {
        background: var(--theme-bg-selected);
      }
    }
  }
  .key-button {
    width: 14px;
    height: 14px;
    fill: #fff
  }
}
</style>