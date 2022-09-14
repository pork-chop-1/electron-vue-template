<template>
  <div id="top-search">
    <input type="text" 
      v-model="key" 
      @keypress.enter="search" 
      @click.stop="startInput"
      :placeholder="searchInfo?.showKeyword">
    <DropDown class="search-dropdown" v-model:visible="visible">
      <div class="history-wrapper">
        <h2>搜索历史</h2>
        <DeletableItem 
          @clickDelete="historyItemDelete(item)" 
          @clickChoose="historyItemSelect(item)"
          v-for="item in historyKeyword"
          :key="item">
          {{item}}
        </DeletableItem>
      </div>
      <div class="suggestion-wrapper" v-show="suggestions != null">
        <!-- 根据order的排序，依次显示建议 -->
        <div v-for="key in suggestions?.order" :key="key">
          <!-- 使用v-for和v-if来做到排序的效果 -->
          <div v-if="key === 'songs'">
            <div class="title">
              单曲
            </div>
            <div class="list" v-for="item in suggestions?.songs" @click="">
              {{item.name}}
            </div>
          </div>
          <div v-else-if="key === 'albums'">
            <div class="title">
              专辑
            </div>
            <div class="list" v-for="item in suggestions?.albums">
              {{item.name}}
            </div>
          </div>
          <div v-else-if="key === 'artists'">
            <div class="title">
              歌手
            </div>
            <div class="list" v-for="item in suggestions?.artists">
              {{item.name}}
            </div>
          </div>
          <div v-else-if="key === 'playlists'">
            <div class="title">
              歌手
            </div>
            <div class="list" v-for="item in suggestions?.playlists">
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
    </DropDown>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { debounce } from 'lodash-es';
import { useRouter } from 'vue-router';
import DropDown from '@/components/DropDown/DropDown.vue';
import DeletableItem from './components/DeletableItem.vue';
import { getDefaultSearch, getSearchSuggest, SearchSuggestionType } from '@/api/Search';
import usePlay from '@/store/play';

// 搜索关键词
const key = ref('')

const router = useRouter()
// 给出搜索提示
const suggestions = ref<SearchSuggestionType | null>(null)
watch(key, debounce(async (v: string) => {
  const res = await getSearchSuggest(v)
  if(res.code === 200) {
    suggestions.value = res.result
  }
}, 500))
// 搜索提示点击
const playStore = usePlay()
const suggestionClick = (id: number, type: keyof SearchSuggestionType) => {
  if(type === 'albums') {
    router.push(`/albumDetail/${id}`)
  } else if(type === 'artists') {
    router.push(`/artistDetail/${id}`)
  } else if(type === 'playlists') {
    router.push(`/playList/${id}`)
  } else if(type === 'songs') {
    // playStore.
    // playStore.setSongId(id)
    
  }
}

// 搜索回调
const search = () => {
  let keyword = key.value
  // 如果存在默认搜索值，而且搜索框内为空
  if(keyword === '' && searchInfo.value) {
    keyword = searchInfo.value.realkeyword
  }
  router.push(`/searchRes/${keyword}`)
  // 更新
  
  historyKeyword.value = Array.from(new Set([...historyKeyword.value, keyword]))
  renewHistoryStorage()
}

// 搜索建议部分
const searchInfo = ref<{
    showKeyword: string;
    realkeyword: string;
} | null>(null)
// 获取搜索建议，2分钟获取一次
const getSuggestion = async () => {
  const res = await getDefaultSearch()
  
  if(res.code === 200) {
    searchInfo.value = res.data
  }
}
onMounted(getSuggestion)
setInterval(getSuggestion, 2 * 60 * 1000)


// 下拉栏的显示
const visible = ref(false)

const startInput = () => {
  visible.value = true
}

// 获取历史搜索记录
const historyKeyword = ref<string[]>([])
const his = localStorage.getItem('historyKeyword')
if(his) {
  historyKeyword.value = JSON.parse(his)
}

// 更新历史
const renewHistoryStorage = () => {
  localStorage.setItem('historyKeyword', JSON.stringify(historyKeyword.value))
}

// 历史记录操作
const historyItemDelete = (keyword: string) => {
  historyKeyword.value = historyKeyword.value.filter(v => v !== keyword)
  renewHistoryStorage()
}
const historyItemSelect = (keyword: string) => {

}

</script>
<style lang="scss" scoped>
  #top-search {
    position: relative;
    width: 200px;
    height: 100%;
    color: var(--plain-fg);
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
      max-height: 400px;
      border: 1px solid black;
      border-radius: 5px;
      z-index: 10;

      .history-wrapper {
        padding: 10px 20px;
        h2 {
          margin: 0;
          font-size: 18px;
        }
      }

      .suggestion-wrapper {
        .title {
          line-height: 34px;
          font-size: 16px;
        }
        .list {
          line-height: 30px;
          font-size: 14px;
          padding-left: 20px;
          &:hover {
            background-color: var(--plain-bg-hover);
          }
        }
      }
    }
  }
</style>