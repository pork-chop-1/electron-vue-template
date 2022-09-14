<template>
  <div id="header-container">
    <div id="logo"></div>

    <!-- 顶部左侧的前进和后退按钮 -->
    <div id="back-button" 
      @click="backPage" 
      :class="{'active': historyPointer !== 0}">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-arrow-left"></use>
      </svg>
    </div>
    <div id="forward-button" 
      @click="forwardPage" 
      :class="{'active': historyPointer !== historyStack.length - 1}">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-arrow-right"></use>
      </svg>
    </div>
    <!-- <ul class="menu">
      <li>
        <div class="top-menu" @click="newWindow">new</div>
      </li>
      <li>
        <div class="top-menu">about</div>
      </li>
    </ul> -->
    <div class="center">
      <!-- 中间的搜索框 -->
      <TopSearch />
    </div>

    <div class="right">
      <!-- 顶部右侧的用户信息 -->
      <TopProfile />

      <!-- 右上角的关键系统按钮 -->
      <button @click="minimize" id="minimize">
        <svg class="icon key-button" aria-hidden="true">
          <use xlink:href="#icon-Minimize"></use>
        </svg>
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
        <svg class="icon key-button" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRef } from 'vue'
import {useRouter} from 'vue-router'
import TopProfile from './TopProfile.vue';
import TopSearch from './TopSearch.vue';

// 右上角的关键系统按钮
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

// --------------------------------
// 顶部左边的前进和后退按钮
const router = useRouter()

// 用于储存模拟历史栈
const historyStack = ref([window.location.href])
// 历史栈的位置
const historyPointer = ref(0)
router.afterEach(() => {
  let newHistoryLength = window.history.length
  let newHistoryHref = window.location.href
  // 当新旧历史长度不同时，则表示执行的不是前进后退
  if(newHistoryLength !== historyStack.value.length) {
    // 清除掉当前位置到最后的数据，将新页面压栈
    historyStack.value.length = historyPointer.value + 1
    historyStack.value.push(newHistoryHref)
    historyPointer.value += 1
  }
})
// 点击后退按钮
const forwardPage = () => {
  router.forward()
  if(historyPointer.value < historyStack.value.length - 1) {
    historyPointer.value += 1
  }
}
// 点击前进按钮
const backPage = () => {
  router.back()
  if(historyPointer.value > 0) {
    historyPointer.value -= 1
  }
}
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

  #forward-button,
  #back-button {
    width: 20px;
    height: 20px;
    margin: 10px 5px;
    border-radius: 50%;
    overflow: hidden;
    background: var(--theme-bg-darker);
    font-size: 14px;
    flex-shrink: 0;
    -webkit-app-region: no-drag;

    & > svg {
      font-size: 14px;
      width: 20px;
      height: 20px;
      fill: var(--theme-fg-darker);
    }

    &.active {
      cursor: pointer;
      & > svg {
        fill: var(--theme-fg);
      }
    } 
  }

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