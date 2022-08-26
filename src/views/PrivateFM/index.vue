<template>
  <div>
    <button @click="handler">open Menu</button>
    <DropDown v-model:visible="visible">
      <BMenu :menuInfo="MenuInfo"  />
    </DropDown>
  </div>
</template>
<script lang="ts" setup>
import BMenu, { type MenuItemType } from '@/components/BMenu/index.vue'
import DropDown from '@/components/BMenu/DropDown.vue';
import { reactive, ref } from 'vue';

const handler = () => {
  console.log(visible.value)
  visible.value = !visible.value
}

const MenuInfo = reactive<MenuItemType[]>([
  {
    name: 'First',
    key: 'First',
    clickHandler: (name: string, key: string) => {

    },
    children: [
      {
        name: 'First-1',
        key: 'First-1',
        clickHandler: (name: string, key: string) => {

        }
      },
      {
        name: 'First-2',
        key: 'First-2',
        clickHandler: (name: string, key: string) => {

        }
      }
    ]
  },
  {
    name: 'Second',
    key: 'Second',
    clickHandler: (name: string, key: string) => {

    },
  },
  {
    name: 'Third',
    key: 'Third',
    clickHandler: (name: string, key: string) => {

    }
  },

])
const visible = ref(false)
</script>
<style lang="scss">
</style>