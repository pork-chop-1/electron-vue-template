<template>
  <div class="pagination-container">
    <button
      :disabled="current === 1"
      @click="currentChange(current - 1)"
      class="pagination-item"
    >&lt;</button>
    <button
      :class="{current: current === 1}"
      @click="currentChange(1)"
      class="pagination-item"
    >1</button>
    <!-- 中间列表长度不为0并且第一个不是2 -->
    <div
      class="left-dots pagination-ellipsis"
      v-show="centerList.length !== 0 && centerList[0] != 2"
    >•••</div>
    <button
      v-for="i in centerList"
      :key="i"
      :class="{ current: current === i}"
      class="pagination-item"
      @click="currentChange(i)">{{ i }}</button>
    <!-- 中间列表长度不为0并且最后一个不是pageSize-1 -->
    <div
      class="right-dots pagination-ellipsis"
      v-show="centerList.length !== 0 && centerList[centerList.length - 1] != pageSize - 1"
    >•••</div>
    <button
      :class="{ current: current === pageSize}"
      v-show="pageSize > 1"
      class="pagination-item"
      @click="currentChange(pageSize)">{{ pageSize }}</button>
    <button
      :disabled="current === pageSize"
      class="pagination-item"
      @click="currentChange(current + 1)"
    >&gt;</button>
  </div>
</template>
<script lang="ts" setup>
import { Comment } from '@/api/Comment'
import { computed, onMounted, ref, toRef, watch } from 'vue';
import {range} from 'lodash-es'

const props = defineProps<{
  current: number,
  total: number,
}>()

const current = toRef(props, 'current')
const total = toRef(props, 'total')
const size = ref(20)
const emits = defineEmits(['update:current'])

const centerList = ref<number[]>([])
const pageSize = computed(() => Math.ceil(total.value / size.value))
watch(current, v => {
  if(pageSize.value < 8) {
    centerList.value = range(2, pageSize.value)
  }
  if(v < 3) {
    v = 3
  }
  if(v > pageSize.value - 3) {
    v = pageSize.value - 3
  }
  const res = []
  for(let i = -2; i < 3; i++) {
    if(v + i > 1 && v + i < pageSize.value) {
      res.push(v + i)
    }
  }
  centerList.value = res
}, {immediate: true})

const currentChange = (now: number) => {
  if(now !== current.value) {
    emits('update:current', now)
  }
}
</script>
<style lang="scss">
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;

  .pagination-item {
    min-width: 32px;
    height: 32px;
    border: 1px solid #d9d9d9;
    background-color: var(--plain-bg);
    color: var(--plain-fg);
    border-radius: 2px;
    margin-right: 8px;
    cursor: pointer;

    &:disabled {
      background-color: var(--plain-bg-hover);
      cursor: not-allowed;
    }
  }

  .current {
    border-color: var(--theme-bg);
    color: var(--theme-bg);
  }

  .pagination-ellipsis {
    margin-right: 8px;
  }
}
</style>
