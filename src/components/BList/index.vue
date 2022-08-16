<template>
  <div class="list-wrapper">
    <div class="header-wrapper">
      <div class="header">
        <div v-for="item in _headData" :key="item.id" :style="{width: item.width}">{{item.name}}</div>
      </div>
    </div>
    <div class="body-wrapper" ref="container">
      <div class="body">
        <div v-for="list in _listData" :key="list.id" class="body-item">
          <div v-for="key in _headData" :key="key.id" :style="{width: key.width}">{{list[key.id as keyof typeof list]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, Ref, ref} from 'vue'
import useDragSelect from '@/hooks/useDragSelect';
const headData = [
  {
    id: 'id',
    name: '标题',
    width: '20%'
  },
  {
    id: 'content',
    name: '标题',
    width: '80%'
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
const _headData = computed(() => {
  return headData
})
const _listData = computed(() => {
  return listData
})

const container = ref<HTMLElement>()
onMounted(() => {
  if(container.value) {
    let {
      locInfo,
      holding,
      setEndHolding
    } = useDragSelect(container as Ref<HTMLElement>)
    setEndHolding(() => {
      console.log(holding, locInfo)
    })
  }
})
</script>
<style lang="scss">
  .list-wrapper {
    position: relative;
    width: 100%;
    .header{
      width: 100%;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      position: relative;
      &::after {
        position: absolute;
        content: "";
        display: block;
        left: 0;
        right: 0;
        height: 1px;
        background: #f1f2f4;
        bottom: 0;
      }
    }
    .body {
      width: 100%;
      position: relative;
      .body-item {
        position: relative;
        width: 100%;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        &::after {
          position: absolute;
          content: "";
          display: block;
          left: 0;
          right: 0;
          height: 1px;
          background: #f1f2f4;
          bottom: 0;
        }
      }
    }
  }
</style>