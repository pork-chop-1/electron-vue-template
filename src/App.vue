<template>
  <div>
    <Header />
    <h1>💖 Hello World!</h1>
    <p>Welcome to your Electron application.</p>
    <button @click="clickHandler">{{ 'you have click ' + times + 's' }}</button>
    <button @click="openFileHandler">open file</button>
    <input ref="docpicker" type="file" id="docpicker" accept=".json,.js,.mp3">
    <button @click="showInfo">showFileInfo</button>
    <audio controls :src="musicPath">
      Your browser does not support the
      <code>audio</code> element.
    </audio>
    <div class="slider-wrapper">
      <Slider/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Header from './components/Header/index.vue'
import Slider from './components/Slider/index.vue'

console.log('ts enable')
const times = ref(0)
const clickHandler = () => {
  times.value++
}
const openFileHandler = async () => {
  const path = await window.electronAPI.openFile()
  console.log(path)
}
const docpicker = ref<HTMLInputElement | null>(null)
const musicPath = ref('')
const showInfo = () => {
  if (docpicker.value) {
    console.log(docpicker.value.files)
    if(docpicker.value.files && docpicker.value.files.length > 0) {
      // var url = URL.createObjectURL(docpicker.value.files[0])
      let url = 'b-media:///' + docpicker.value.files[0].path
      musicPath.value = url
    }
  }
}
  // onMounted(())
</script>
<style>
.slider-wrapper {
  padding: 20px;
}
</style>