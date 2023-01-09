<template>
  <div>
    <button>&lt;</button>
    <button>1</button>
    <div class="left-dots">...</div>
    <button v-for="i in centerList" :key="i">{{ i }}</button>
    <div class="right-dots">...</div>
    <button v-show="pageSize > 1">{{ pageSize }}</button>
    <button>&gt;</button>
  </div>
</template>
<script lang="ts" setup>
import { Comment } from '@/api/Comment'
import { computed, onMounted, ref, toRef, watch } from 'vue';

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

}, {immediate: true})
</script>
<style lang="scss">

</style>
