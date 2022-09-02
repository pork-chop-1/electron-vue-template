<template>
  <template v-for="item, index in props.list" :key="item.id">
    <slot :id="item.id" :content="item.name">
      {{ item.name }}
    </slot>
    <!-- 分离字符最后一个不显示 -->
    <span v-show="index + 1 !== props.list.length">/</span>
  </template>
</template>

<script lang="ts" setup>
const props = defineProps<{
  list: {
    name: string,
    id: string
  }[]
}>()

</script>