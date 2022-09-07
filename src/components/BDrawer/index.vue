<template>
  <teleport :to="'#center'" v-if="isMounted" >
    <div class="drawer-wrapper" :style="wrapperStyle" >
      <div class="drawer-mask" @click="maskClickHandler" :style="maskStyle"></div>
      <div class="drawer-content" :style="contentStyle">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref, toRef, watch } from 'vue';

const props = defineProps<{
  visible: boolean,
  width?: string,
  getContainer?: string
}>()

const visible = toRef(props, 'visible')
const container = toRef(props, 'getContainer')
const emits = defineEmits(['update:visible'])

const wrapperStyle = reactive({
  width: '0',
  height: '0',
  transition: 'none'
})

const maskStyle = reactive({
  width: '100%',
  height: '100%',
  opacity: 0,
})

const contentStyle = reactive({
  width: '400px',
  height: '100%',
  transform: 'translateX(100%)',
  right: '0'
})

watch(visible, (v) => {
  if(v) {
    wrapperStyle.width = '100%'
    wrapperStyle.height = '100%'
    wrapperStyle.transition = 'none'
    
    maskStyle.opacity = 1

    contentStyle.transform = 'translateX(0)'
  } else {
    wrapperStyle.width = '0'
    wrapperStyle.height = '0'
    wrapperStyle.transition = 'width 0s .3s, height 0s .3s'
    
    maskStyle.opacity = 0

    contentStyle.transform = 'translateX(100%)'
  }
})

const maskClickHandler = () => {
  emits('update:visible', false)
}


// 当mounted才teleport
const isMounted = ref(false)
onMounted(function () {
  nextTick(() => {

    isMounted.value = true
  })
})

</script>
<style lang="scss">
  .drawer-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    // transition: width 0s .3s, height 0s .3s;

    .drawer-mask {
      position: absolute;
      background: #00000073;
      left: 0;
      top: 0;
      transition: opacity .3s;
    }

    .drawer-content {
      position: absolute;
      width: 400px;
      height: 100%;
      background: var(--plain-bg);
      transition: transform .3s;
    }
  }
</style>