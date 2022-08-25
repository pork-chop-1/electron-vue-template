<template>
  <div class="b-menu-container" ref="container">
    <div class="b-menu-item" v-for="item in MenuInfo" :key="item.key"
      @click="item.clickHandler == null ? null : item.clickHandler(item.name, item.key)">
      <slot :menu-item="item">
        <div class="b-menu-item-title">
          {{ item.name }}
        </div>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:  'BMenu',
  setup () {

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

    return {
      MenuInfo
    }
  },
  mounted() {
    console.log(this.$refs.container)
  }
})
export type MenuItemType = {
  name: string;
  key: string;
  clickHandler?: (name: string, key: string) => void;
  children?: MenuItemType[];
}

</script>
<style lang="scss">
.b-menu-container {
  width: 200px;
  overflow: hidden auto;
  box-sizing: border-box;
  border: 1px solid grey;
  box-shadow: 0 0 4px grey;
  background-color: var(--plain-bg);
  color: var(--plain-fg);
  border-radius: 5px;
  font-size: 16px;

  .b-menu-item-title {
    width: 100%;
    height: 30px;
    padding-left: 20px;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      background-color: #d2f3f9;
    }
  }
}
</style>