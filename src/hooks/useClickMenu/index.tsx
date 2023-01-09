import { MenuItemType } from "@/components/BMenu";
import BMenu from "@/components/BMenu/BMenu.vue";
import { computed, defineComponent, h, ref, Ref, render, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

function useClickMenu(
  menuInfo: Ref<MenuItemType[]>,
  containerRef?: Ref<HTMLElement | HTMLElement[]>,
  options?: {visible?: Ref<boolean>}
) {
  const visible = options?.visible || ref(false);
  const left = ref(0);
  const top = ref(0);
  const width = ref(0)
  const height = ref(0)

  // 给menuInfo添加点击对象等信息
  const targetRef = ref<HTMLElement>()
  const menuInfoExtra = computed(() => {return menuInfo.value.map(v => {
    return Object.assign(v, { extra: { target: targetRef.value} });
  })})

  const clickHandler = (e: MouseEvent) => {
    if (e.button !== 2) {
      return false;
    }
    targetRef.value = e.target as HTMLElement
    visible.value = true;
    top.value = e.pageY;
    // 判断位置
    let bodyWidth = document.body.offsetWidth
    let bodyHeight = document.body.offsetHeight;
    if(bodyWidth < e.pageX + width.value) {
      left.value = e.pageX - width.value;
    } else {
      left.value = e.pageX;
    }
    return true;
    // if(bodyHeight < e.pageY + width.value) {
    //   top.value = e.pageY - height.value
    // } else {
    //   top.value = e.pageY;
    // }
  };
  const clickOutsideHandler = (e: MouseEvent) => {
    visible.value = false;
  };

  // 直接提供了绑定domRef的话就绑定，否则直接返回clickHandler
  if (containerRef != null) {
    if (!Array.isArray(containerRef.value)) {
      (containerRef.value as HTMLElement).addEventListener(
        "mouseup",
        clickHandler
      );
    } else {
      (containerRef.value as HTMLElement[]).forEach((item) => {
        item.addEventListener("mouseup", clickHandler);
      });
    }
  }
  const menuWrapper = defineComponent({
    setup() {},
    render() {
      const wrapper = ref<HTMLElement>();
      let done = false;
      watch(wrapper, (v) => {
        if (!done) {
          if (v != null) {
            done = true;
            onClickOutside(v, clickOutsideHandler);
          }
        }
        if (v != null) {
          width.value = v.offsetWidth;
          height.value = v.offsetHeight;
        }
      });
      if (visible.value) {
        return (
          <div
            style={{
              position: "absolute",
              left: left.value + "px",
              top: top.value + "px",
            }}
            ref={wrapper}
          >
            <BMenu menuInfo={menuInfoExtra.value}></BMenu>
          </div>
        )
      }
    },
  });

  const container = document.createElement("div");
  render(<menuWrapper />, container);
  document.body.appendChild(container);

  return clickHandler;
}

export default useClickMenu;
