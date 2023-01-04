import { MenuItemType } from "@/components/BMenu";
import BMenu from "@/components/BMenu/BMenu.vue";
import { Ref } from "vue";

function useClickMenu(
  containerRef: Ref<HTMLElement>,
  menuInfo: Ref<MenuItemType[]>
) {
  const MenuWrapper = () => {
    let left = 0,
      top = 0;
    return (
      <div>
        <BMenu
          v-bind:menuInfo={menuInfo}
          style={{ position: "relative", left, top }}
        ></BMenu>
      </div>
    );
  };
}

export default useClickMenu;
