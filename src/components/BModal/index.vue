<template>
  <div v-if="visible" class="modal-wrapper">
    <div class="modal">
      <div class="header-wrapper">
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="button-wrapper">
          <div class="close-button" @click="">
            x
          </div>
        </div>
      </div>
      <div class="main">
        <slot name="main"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { toRef } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const visible = toRef(props, 'visible')

</script>
<style lang="scss">
.modal-wrapper{
  width: 100%;
  height: 100%;
  .modal{
    position: relative;
    min-width: 600px;
    min-height: 500px;
    margin: 300px auto 0;
    background-color: var(--plain-bg);
    color: var(--plain-fg);

    .header-wrapper {
      width: 100%;
      height: 70px;
      display: flex;
      font-size: 16px;
      line-height: 70px;

      .header {
        flex-shrink: 0;
        flex-grow: 1;
      }

      .button-wrapper {
        flex-shrink: 0;
        flex-grow: 0;
      }

      >div {
        width: 70px;
        height: 70px;
      }
    }

    .main {
      width: 100%;
      height: calc(100% - 70px)
    }
  }
}
</style>
