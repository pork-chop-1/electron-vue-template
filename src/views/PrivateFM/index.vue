<template>
  <div>
    <button @click="handler">open Menu</button>
    <DropDown v-model:visible="visible">
      <BMenu :menuInfo="MenuInfo" />
    </DropDown>


    <button @click.stop="handler2">click</button>
    <a-dropdown :trigger="['click']" v-model:visible="v2">
      <a class="ant-dropdown-link" @click.prevent>
        Click me
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0">
            <a href="http://www.alipay.com/">1st menu item</a>
          </a-menu-item>
          <a-menu-item key="1">
            <a href="http://www.taobao.com/">2nd menu item</a>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">3rd menu item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script lang="ts" setup>
import BMenu, { type MenuItemType } from '@/components/BMenu/index.vue'
import DropDown from '@/components/BMenu/DropDown.vue';
import { reactive, ref, watch } from 'vue';

const handler = () => {
  // console.log(visible.value)
  console.log(2)
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
const v2 = ref(false)
const handler2 = () => {
  console.log('handler2', v2.value)
  setTimeout(() => {v2.value = !v2.value}, 1000)
}
watch(v2, (v, old) => {
  console.log(v, old)
})
</script>
<style lang="scss">
</style>