<template>
  <div>
    <button @click="openFileHandler">open file</button>
    <input ref="docpicker" type="file" id="docpicker" accept=".json,.js,.mp3">
    <button @click="showInfo">showFileInfo</button>
    <audio controls :src="musicPath">
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';

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


window.storeAPI.set('unicorn', '🦄');
// console.log(await window.storeAPI.get('unicorn'));
  // onMounted(())
</script>
<style lang="scss">
</style>