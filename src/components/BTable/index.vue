<template>
  <table class="list-wrapper">
    <thead class="header">
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
      <tr v-for="list in dataSource" 
        :key="list.key" 
        :class="{ 'body-item-group': true }" 
        @click="listSelect(list.id)">
        <td class="body-item" v-if="rowSelection?.selectedRowKeys">
          <a-checkbox v-model:checked="checkList[list.key as keyof typeof checkList]"></a-checkbox>
        </td>
        <td v-for="key in columns" 
          :key="key.key" 
          :style="{ width: key.width }" 
          class="body-item">
          <slot name="bodyCell" :column="key" :record="list">
            {{ list[key.key as keyof typeof list] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts" setup>
import { computed, ComputedRef, onMounted, PropType, reactive, Ref, ref, toRef, watch } from 'vue'
import useDragSelect from '@/hooks/useDragSelect'

export type ColumnsType = {
  key: number | string,
  title: number | string,
  width?: string,
  [otherKey: string]: any
}

export type DataSourceType = {
  key: number | string,
  [otherKey: string]: any
}

const props = defineProps({
  columns: {
    type: Array as PropType<ColumnsType[]>,
    require: true,
  },
  dataSource: {
    type: Array as PropType<DataSourceType[]>,
    require: true,
  },
  rowSelection: {
    type: Object as PropType<{
      selectedRowKeys: (string|number)[],
      onChange: (arg1: (string|number)[]) => void
    }>,
    require: false,
  },
})
const columns = toRef(props, 'columns') as Ref<ColumnsType[]>
const dataSource = toRef(props, 'dataSource') as Ref<DataSourceType[]>
console.log(props);


let checkList:Ref<{[key: string | number]: boolean}> = ref({})
dataSource.value.forEach(v => {
  checkList.value[v.key] = false
})

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
  })
}

// ref(dataSource.value.map(v => {
//   return {[v.key]: false}
// }))
// watch(dataSource, () => {

// })

const listSelect = (id: string | number) => {

}
const container = ref<HTMLElement>()
onMounted(() => {
  if (container.value) {
    let {
      locInfo,
      holding,
      setEndHolding
    } = useDragSelect(container as Ref<HTMLElement>)
    setEndHolding(() => {
      console.log(holding, locInfo)
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
    }
  }
}
</style>