<template>
  <div class="pagination-container">
    <button :disabled="current === 1" @click="currentChange(current - 1)">&lt;</button>
    <button :class="{current: current === 1}" @click="currentChange(1)">1</button>
    <!-- 中间列表长度不为0并且第一个不是2 -->
    <div class="left-dots" v-show="centerList.length !== 0 && centerList[0] != 2">...</div>
    <button
      v-for="i in centerList"
      :key="i"
      :class="{ current: current === i}"
      @click="currentChange(i)">{{ i }}</button>
    <!-- 中间列表长度不为0并且最后一个不是pageSize-1 -->
    <div
      class="right-dots"
      v-show="centerList.length !== 0 && centerList[centerList.length - 1] != pageSize - 1">...</div>
    <button
      :class="{ current: current === pageSize}"
      v-show="pageSize > 1"
      @click="currentChange(pageSize)">{{ pageSize }}</button>
    <button :disabled="current === pageSize"  @click="currentChange(current + 1)">&gt;</button>
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
  emits('update:current', now)
}
</script>
<style lang="scss">
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;

  .current {
    background-color: var(--theme-bg)
  }
}
</style>
