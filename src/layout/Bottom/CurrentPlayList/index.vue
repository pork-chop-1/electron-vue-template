<template>
  <BDrawer v-model:visible="currentPlaylistVisible" :get-container="'#center'" >
    <div id="current-playlist-container">
    <h2>当前播放</h2>
    <div class="info-wrapper">
      共{{ songList.length }}首
    </div>
    <div class="playlist-wrapper" ref="scrollContainer">
      <BTable :is-hide-header="true" :columns="columns" :data-source="data" ref="recentTable">
        <template #bodyCell="{column, record}">
          <!-- 处理列表中的歌曲名称 -->
          <template v-if="column.key === 'title'">
            <a
              :class="{current: currentSong?.id === record.key}"  
              @click.prevent="toggleSong(record.key as number)">
              {{record.title }}
            </a>
          </template>
          
          <!-- 处理列表中的艺术家 -->
          <template v-else-if="column.key === 'artists'">
            <ListCombine :list="record.artists" #="{ id, item }">
              <router-link 
                :class="{current: currentSong?.id === record.key}" 
                :to="`/artistDetail/${id}`">
                {{item.name}}
              </router-link>
            </ListCombine>
          </template>
          <template v-else>
            <span :class="{current: currentSong?.id === record.key}">
              {{ record[column.key] }}
            </span>
          </template>
        </template>
      </BTable>
    </div>
  </div>
    </BDrawer>

</template>
<script lang="ts" setup >
import { usePlay } from '@/store/play'
import { computed, ref, toRef, watch } from 'vue';
import BTable, {API as BTableAPI} from '@/components/BTable/index.vue'
import { type ColumnsType, type DataSourceType } from '@/components/BTable'
import BDrawer from '@/components/BDrawer/index.vue'
import ListCombine from '@/components/Functional/ListCombine.vue'
import { convertTime } from '@/utils/NumberUtils';

const props = defineProps<{
  visible: boolean
}>()
const emits = defineEmits(['update:visible'])
// 使用watch传递一下参数，好好看好好学
const currentPlaylistVisible = computed({
  get: () => {
    return props.visible
  },
  set: (v) => {
    emits('update:visible', v)
  }
})

const playStore = usePlay()

const songList = toRef(playStore, 'songList')
const currentIndex = toRef(playStore, 'currentSongIndex')
const currentSong = toRef(playStore, 'songInfo')

const recentTable = ref<typeof BTable | null>(null)
const scrollContainer = ref<HTMLElement | null>(null)

watch(currentSong, (v) => {
  // const rowRefs: BTableAPI['rowRefs'] = BTable.rowRefs
  // console.log(recentTable.value?.rowRefs)
})

// 当列表当前播放的歌曲改变时，滚动到屏幕中间
watch(currentIndex, (v) => {
  if(recentTable.value && recentTable.value.rowRefs) {
    const ele: HTMLElement = recentTable.value.rowRefs[v]
    scrollContainer.value?.scroll({
      top: ele.offsetTop - scrollContainer.value.offsetHeight / 2,
      behavior: 'smooth',
    })
    // 使用scrollIntoView将会直接改变所有可能的外层滚动，即使它是hidden，不要用它
    // https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move
    // ele.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'nearest'
    // })
  }
})

// 当打开时，当前歌曲移动到中间
watch(currentPlaylistVisible, (v) => {
  if(v && recentTable.value && recentTable.value.rowRefs) {
    const ele: HTMLElement = recentTable.value.rowRefs[currentIndex.value]
    window.setTimeout(() => {

      // ele.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'nearest'
      // })
      scrollContainer.value?.scroll({
        top: ele.offsetTop - scrollContainer.value.offsetHeight / 2,
        behavior: 'smooth',
      })
    } , 200) // 由于动画的原因，延迟了200ms
  }
})

const columns: ColumnsType[] = [
  {
    key: 'title',
    title: 'title',
  },
  {
    key: 'artists',
    title: 'artists'
  },
  {
    key: 'duration',
    title: 'duration'
  }
]
const data = computed<DataSourceType[]>(() => {
  return songList.value.map((v) => {
    return {
      key: v.id,
      title: v.name,
      artists: v.ar,
      duration: convertTime(v.dt).text,
    }
  })
})

const toggleSong = (id: number) => {
  console.log(id)
  playStore.setSongId(id)
  playStore.setPlaneStatus(true)
}
</script>
<style lang="scss" scoped>
  #current-playlist-container {
    position: relative;
    width: 100%;
    height: 100%;
    h2 {
      height: 30px;
    }
    
    .info-wrapper {
      height: 30px;
    }

    .playlist-wrapper {
      height: calc(100% - 60px);
      overflow: auto;
    }

    .current {
      color: var(--theme-bg);
      font-weight: 600;
    }
  }

</style>