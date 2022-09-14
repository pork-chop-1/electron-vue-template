<template>
  <div class="deletable-wrapper" @click="clickChoose">
    <slot></slot>
    <svg class="icon delete-button" aria-hidden="true" @click="clickDelete">
      <use xlink:href="#icon-close"></use>
    </svg>
  </div>
</template>
<script lang="ts" setup>
const emits = defineEmits(['clickChoose', 'clickDelete'])
const clickDelete = () => {
  emits('clickDelete')
}
const clickChoose = () => {
  emits('clickChoose')
}
</script>
<style lang="scss" scoped>
  .deletable-wrapper {
    position: relative;
    display: inline-block;
    height: 26px;
    border: 1px solid #666;
    border-radius: 13px;
    padding: 5px 15px;
    font-size: 12px;
    line-height: 12px;
    color: var(--plain-fg);
    box-sizing: border-box;
    margin: 2px 10px 2px 0;

    &:hover {
      background-color: rgba(161, 161, 161, 0.182);

      .delete-button  {
        visibility: visible;
      }
    }

    .delete-button {
      position: absolute;
      top: 5px;
      right: 2px;
      width: 14px;
      height: 14px;
      border-radius: 10px;
      visibility: hidden;
    }
  }
</style>