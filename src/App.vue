<template>
  <div>
    <Header />
    <h1>💖 Hello World!</h1>
    <p>Welcome to your Electron application.</p>
    <button @click="clickHandler">{{'you have click ' + times + 's'}}</button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Header from './components/Header/index.vue'

  console.log('ts enable')
  const times = ref(0)
  const clickHandler = () => {
    times.value ++
  }
</script>
<style>
  
</style>