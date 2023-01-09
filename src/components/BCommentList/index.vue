<template>
  <div v-if="loading">
    comment
  </div>
  <div v-else>

  </div>
</template>
<script lang="ts" setup>
import {Comment} from '@/api/Comment'
import { onMounted, ref } from 'vue';

const loading = ref(true)

onMounted(async () => {
  const res = await Comment.getSongComment(186016, 20, 0)
  loading.value = false
  console.log(res)

})
</script>
<style lang="scss">

</style>
