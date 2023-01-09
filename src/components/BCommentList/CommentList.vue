<template>
  <div>
    <div class="list-item" v-for="item in listData" :key="item.key">
      <slot name="listItem" :data="item"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Comment } from '@/api/Comment'
import { onMounted, ref, toRef } from 'vue';

const props = defineProps<{
  loading: boolean,
  listData: {
    key: string,
    [otherKey: string]: any
  }[]
}>()
const loading = toRef(props, 'loading')
const listData = toRef(props, 'listData')

</script>
<style lang="scss">

</style>
