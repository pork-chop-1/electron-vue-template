<template>
  <div class="list-wrapper">
    <div class="header-wrapper">
      <div class="header">
        
      </div>
    </div>
    <div class="body-wrapper">

    </div>
  </div>
</template>
<script lang="ts" setup>
import {reactive} from 'vue'
const headData = [
  {
    id: 'id',
    name: '标题'
  },
  {
    id: 'content',
    name: '标题'
  }
]
const listData = [
  {
    id: '1',
    content: ' git show --textconv :src/components/Bottom/index.vue [49ms]'
  },
  {
    id: '2',
    content: '57.184Z] > git show --textconv :src/com'
  },
  {
    id: '3',
    content: 'om https://github.com/pork-chop-1/el'
  },
  {
    id: '4',
    content: ' git ls-files --stage '
  },
]
const _headData = reactive(headData)
const _listData = reactive(listData)
</script>
<style lang="scss">
  .list-wrapper {
    width: 100%;

  }
</style>