<template>
  <div id="top-search">
    <input type="text" v-model="key">
  </div>
</template>
<script lang="ts" setup>import { ref } from 'vue';

const key = ref('')
</script>
<style lang="scss">
  #top-search {
    width: 200px;
    height: 100%;
    >input {
      width: 100%;
      height: 20px;
      font-size: 14px;
      border: none;
      outline: none;
    }
  }
</style>