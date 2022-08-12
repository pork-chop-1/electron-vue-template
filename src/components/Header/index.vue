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
    <div class="right">
      <button @click="minimize" id="minimize">
        <minus-outlined />
      </button>
      <button @click="maximize" id="maximize">
        <fullscreen-outlined v-show="!isMaximized" />
        <fullscreen-exit-outlined v-show="isMaximized" />
      </button>
      <button @click="close" id="close">
        <close-outlined />
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {
  CloseOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  MinusOutlined
} from '@ant-design/icons-vue';

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
  background: var(--theme-background-color);
  color: var(--theme-foreground-color);
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
          background: var(--theme-background-selected);
        }
      }
    }
  }

  .right {
    -webkit-app-region: no-drag;
    margin-left: auto;

    >button {
      border: none;
      width: 40px;
      height: 40px;
      background: inherit;

      &#close:hover {
        background: var(--theme-background-danger)
      }

      &:hover {
        background: var(--theme-background-selected);
      }
    }
  }
}
</style>