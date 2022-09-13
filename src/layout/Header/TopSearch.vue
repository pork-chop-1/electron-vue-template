<template>
  <div id="top-search">
    <input type="text" 
      v-model="key" 
      @keypress.enter="search" 
      @click.stop="startInput">
    <DropDown class="search-dropdown" v-model:visible="visible">

    </DropDown>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { debounce } from 'lodash-es';
import { useRouter } from 'vue-router';
import DropDown from '@/components/DropDown/DropDown.vue';
import { getDefaultSearch, getSearchSuggest } from '@/api/Search';

// 搜索关键词
const key = ref('')

const router = useRouter()
// 给出搜索提示
watch(key, debounce(async (v: string) => {
  const res = await getSearchSuggest(v)
  console.log(res)
}, 500))

// 搜索回调
const search = () => {
  console.log(key.value)
  router.push(`/searchRes/${key.value}`)

  // 更新历史
  historyKeyword.value.push(key.value)
  localStorage.setItem('historyKeyword', JSON.stringify(historyKeyword.value))
}

// 获取搜索建议，2分钟获取一次
onMounted(async () => {
  console.log('1')
  const res = await getDefaultSearch()
  console.log(res)
})

// 下拉栏的显示
const visible = ref(false)

const startInput = () => {
  visible.value = true
}

// 获取历史搜索记录
const historyKeyword = ref<string[]>([])
onMounted(() => {
  const his = localStorage.getItem('historyKeyword')
  if(his) {
    historyKeyword.value = JSON.parse(his)
  }
})

// 
</script>
<style lang="scss" scoped>
  #top-search {
    position: relative;
    width: 200px;
    height: 100%;
    >input {
      width: 100%;
      height: 20px;
      font-size: 14px;
      border: none;
      outline: none;
      color: var(--plain-fg)
    }

    :deep(.search-dropdown) {
      position: absolute;
      left: 0;
      top: 30px;
      width: 300px;
      height: 400px;
      border: 1px solid black;
      border-radius: 5px;
      z-index: 10;
    }
  }
</style>