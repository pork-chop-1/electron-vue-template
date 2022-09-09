<template>
  <div>
   <div class="fm-container">
    <div class="left">
      <div class="cover-wrapper"></div>
      <div class="control-wrapper"></div>
    </div>
    <div class="right">
      <div class="info-wrapper">
        <div class="title"></div>
        <div class="info">
          
        </div>
      </div>
      <div class="lyrics-wrapper">
        
      </div>
    </div>
   </div>
   <div class="comment-container">

   </div>
  </div>
</template>
<script lang="ts" setup>
import { getPersonalFM } from '@/api/PersonalFm';
import { onMounted, reactive, ref, watch } from 'vue';

onMounted(async () => {
  const res = await getPersonalFM()

  console.log(res)

})
</script>
<style lang="scss">
</style>