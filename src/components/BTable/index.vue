<template>
  <table class="list-wrapper">
    <thead class="header" v-if="!props.isHideHeader">
      <tr>
        <td class="header-item" v-if="rowSelection?.selectedRowKeys">
          <a-checkbox></a-checkbox>
        </td>
        <td 
          v-for="item in columns" 
          :key="item.key" 
          :style="{ width: item.width }" 
          class="header-item">
          <slot name="headerCell" :column="item">
            {{ item.title }}
          </slot>
        </td>
      </tr>
    </thead>
    <tbody class="body" ref="container">
      <tr v-for="dataItem in dataSource" 
        :key="dataItem.key" 
        :class="{ 'body-item-group': true }" 
        ref="rowRefs"
        @click="listSelect(dataItem.id)">
        <td class="body-item" v-if="rowSelection?.selectedRowKeys">
          <a-checkbox v-model:checked="checkList[dataItem.key as keyof typeof checkList]"></a-checkbox>
        </td>
        <td v-for="key in columns" 
          :key="key.key" 
          :style="{ width: key.width }" 
          class="body-item">
          <slot name="bodyCell" :column="key" :record="dataItem">
            {{ dataItem[key.key as keyof typeof dataItem] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts" setup>
export interface API {
  rowRefs: HTMLElement[]
}

import { computed, ComputedRef, onMounted, PropType, reactive, Ref, ref, toRef, watch } from 'vue'
import useDragSelect from '@/hooks/useDragSelect'
import { ColumnsType, DataSourceType } from '.';

const props = defineProps<{
  columns: ColumnsType[],
  dataSource: DataSourceType[],
  rowSelection?: {
    selectedRowKeys: (string|number)[],
    onChange: (arg1: (string|number)[]) => void
  },
  isHideHeader?: boolean
}>()
// const columns = reactive(props.columns as ColumnsType[])
const columns = toRef(props, 'columns')
// const dataSource = reactive(props.dataSource as DataSourceType[])
const dataSource = toRef(props, 'dataSource')


let checkList = reactive<{[key: string | number]: boolean}>({})
dataSource.value?.forEach(v => {
  checkList[v.key] = false
})

// 
if(props.rowSelection) {
  // emits('update:selectList', selectList)
  console.log('rowSelection');
  
  const rowSelection = reactive(props.rowSelection)
  // watch(reactive(rowSelection.selectedRowKeys), (list) => {
  //   // console.log(list);
  //   let res: {
  //     [x: string]: boolean;
  //   } = {}
  //   dataSource.value.forEach(v => {
  //     res[v.key] = list?.indexOf(v.key) !== -1
  //   })
  //   // console.log(res);
    
  //   checkList.value = res
  //   console.log(rowSelection.selectedRowKeys)
  // })

  watch(checkList, (v) => {
    let res: (string | number)[] = []
    Object.keys(v).forEach(key => {
      if(v[key]) {
        res.push(key)
      }
    })
    console.log(res);
    
    // rowSelection.selectedRowKeys = res
    rowSelection.onChange(res)
  }), {
    deep: true
  }
}

// ref(dataSource.value.map(v => {
//   return {[v.key]: false}
// }))
// watch(dataSource, () => {

// })

const listSelect = (id: string | number) => {

}
const container = ref<HTMLElement>()


// 暴露出tbody中每行的引用
const rowRefs = ref<HTMLElement[] | undefined>()

defineExpose({
  rowRefs
})

onMounted(() => {
  if (container.value) {
    let {
      locInfo,
      holding,
      setEndHolding
    } = useDragSelect(container as Ref<HTMLElement>, rowRefs)
    setEndHolding((selectEl, selectStatus) => {
      console.log(holding, locInfo)
      console.log(selectEl, selectStatus)
    })
  }
})
</script>
<style lang="scss">
.list-wrapper {
  position: relative;
  width: 100%;

  .header {
    width: 100%;
    height: 56px;
    position: relative;

    &::after {
      position: absolute;
      content: "";
      display: block;
      left: 0;
      right: 0;
      height: 1px;
      background: #f1f2f4;
      bottom: 0;
    }

    .header-item {
      padding: 16px
    }
  }

  .body {
    width: 100%;
    position: relative;

    .body-item-group {
      position: relative;
      width: 100%;
      height: 56px;
      transition: background-color .2s;

      &::after {
        position: absolute;
        content: "";
        display: block;
        left: 0;
        right: 0;
        height: 1px;
        background: #f1f2f4;
        bottom: 0;
      }

      &:hover {
        background-color: var(--hover-bg);
      }

      .body-item {
        padding: 16px
      }

      &.__selecting {
        background: #979797bd
      }
      &.__selected {
        background: #979797a1
      }
    }
  }
}
</style>