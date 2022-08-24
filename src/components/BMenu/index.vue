<template>
  <div class="b-menu-container">
    <div class="b-menu-item" v-for="item in MenuInfo" :key="item.key">
      <slot>
        
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
export type MenuItemType = {
    name: string;
    key: string;
    clickHandler: (name: string, key: string) => void;
    children?: MenuItemType[];
}

const MenuInfo: MenuItemType[] = [
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

]
</script>
<style lang="scss">
  .b-menu-container {

  }
</style>