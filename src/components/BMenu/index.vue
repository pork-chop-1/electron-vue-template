<template>
  <div class="b-menu-container" ref="container">
    <div class="b-menu-item" 
      v-for="item in MenuInfo" 
      :key="item.key" 
      @click="clickHandler($event, item, MenuInfo)"
    >
      <slot :menu-item="item">
        <div class="b-menu-item-title">
          {{ item.name }}
        </div>
        <div v-show="item.children != null && item.children.length !== 0">
          <svg class="icon b-menu-item-arrow" aria-hidden="true">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </div>
      </slot>
      <template v-if="item.children != null && item.children.length !== 0">
        <BMenu v-show="item._active" :menuInfo="item.children" class="b-submenu-container" />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from 'vue'
export default defineComponent({
  name: 'BMenu',
  props: {
    menuInfo: {
      type: Array as PropType<MenuItemType[]>,
      require: true
    },
  },
  setup(props, ctx) {
    const MenuInfo = reactive(props.menuInfo as _innerMenuType[])
    const clickHandler = (e: MouseEvent, item: _innerMenuType, list: _innerMenuType[]) => {
      if (item.clickHandler) {
        item.clickHandler(item.name, item.key)
      }
      if(!item._active) {
        list.forEach((li) => {
          li._active = false
        })
        item._active = true
      }
      if (item.children != null && item.children.length !== 0) {
        const target = e.currentTarget as HTMLElement
        const submenu = target.querySelector('.b-submenu-container')
        // todo 添加弹出方位判断
        // if (submenu) {

        // }
      }
    }
    
    return {
      MenuInfo,
      clickHandler,
    }
  },
  mounted() {
  }
})
export type MenuItemType = {
  name: string;
  key: string;
  clickHandler?: (name: string, key: string) => void;
  children?: MenuItemType[];
}
type _innerMenuType = {
  _active?: boolean
} & MenuItemType

</script>
<style lang="scss">
$width: 200px;

.b-menu-container {
  width: $width;
  box-sizing: border-box;
  border: 1px solid grey;
  box-shadow: 0 0 4px grey;
  background-color: var(--plain-bg);
  color: var(--plain-fg);
  border-radius: 5px;
  font-size: 16px;

  .b-menu-item {
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      background-color: #d2f3f9;
    }

    .b-menu-item-title {
      padding-left: 20px;
    }
    
    .b-menu-item-arrow{
      width: 30px;
      height: 30px;
      padding: 5px;
    }

    .b-submenu-container {
      position: absolute;
      left: $width - 2;
      top: 0;
    }
  }
}
</style>