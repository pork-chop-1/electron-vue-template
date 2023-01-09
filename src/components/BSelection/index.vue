<template>
<div
class="b-drag-selection"
 v-if="selecting"
:style="{
  width: locInfo.width + 'px',
  height: locInfo.height + 'px',
  left: locInfo.left + 'px',
  top: locInfo.top + 'px',
}">
</div>

</template>
<script lang="ts" setup>
import { reactive, toRef } from 'vue';

const props = defineProps<{ selecting : boolean}>()

const selecting = toRef(props, 'selecting')

const locInfo = reactive({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
});

defineExpose({
  locInfo
})
</script>
<style lang="scss" >
// 拖动hooks
.b-drag-selection {
  box-sizing: border-box;
  position: absolute;
  border: 1px solid var(--theme-bg);
  user-select: none;
  background-color: var(--theme-bg-transparent);
}
</style>
