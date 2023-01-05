import { MenuItemType } from "@/components/BMenu";
import BMenu from "@/components/BMenu/BMenu.vue";
import { computed, defineComponent, h, ref, Ref, render, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

function useClickMenu(
  containerRef: Ref<HTMLElement | HTMLElement[]>,
  menuInfo: Ref<MenuItemType[]>
) {
  const visible = ref(false);
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
      return;
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
    // if(bodyHeight < e.pageY + width.value) {
    //   top.value = e.pageY - height.value
    // } else {
    //   top.value = e.pageY;
    // }
  };
  const clickOutsideHandler = (e: MouseEvent) => {
    visible.value = false;
  };
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
  const MenuWrapper = defineComponent({
    setup() {
    },
    render() {
      const wrapper = ref<HTMLElement>();
      let done = false;
      watch(wrapper, (v) => {
        if(!done) {
          if(v != null) {
            done = true
            onClickOutside(v, clickOutsideHandler);
          }
        }
        if(v != null) {
          width.value = v.offsetWidth
          height.value = v.offsetHeight
        }
      })
      return visible.value ? (
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
      ) : (
        <div></div>
      );
    }
  });

  render(<MenuWrapper />, document.body);
}

export default useClickMenu;
