<template>
  <div>
    search result
  </div>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  const route = useRoute()

  console.log(route.params.keyword)

</script>
<style lang="scss">
  
</style>