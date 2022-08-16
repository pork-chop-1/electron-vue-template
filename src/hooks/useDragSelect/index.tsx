import { Ref, render, ref, reactive, computed, watch } from 'vue';

function useDragSelect(containerRef: Ref<HTMLElement>, 
  opt = {minHeight: 30, minWidth: 2000}) {
  // 是否正在拖拽
  const holding = ref(false);
  // 显示选框
  const selecting = ref(false)
  watch(selecting, (v) => {
    if(v) {
      containerRef.value.style.userSelect = 'none'
      window?.getSelection()?.removeAllRanges()
    } else {
      containerRef.value.style.userSelect = 'auto'
    }
  })
  const locInfo = reactive({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  const endHolding = ref<() => void>()
  const setEndHolding = (callback: () => void) => {
    endHolding.value = callback
  }

  // container边界
  let leftBound = 0, rightBound = 0, topBound = 0, bottomBound = 0

  type locInfoComputedType = {left: string, top: string, width: string, height: string}
  type keyofLocInfo = keyof typeof locInfo
  // 计算根据locInfo转换为px
  const locInfoComputed = computed(() => {
    return Object.keys(locInfo).reduce((pre, cur) => {
      pre[cur as keyof locInfoComputedType] = 
        locInfo[cur as keyofLocInfo] === 0 ? 
          (locInfo[cur as keyofLocInfo] + '') 
          : (locInfo[cur as keyofLocInfo] + 'px')
      return pre
    }, {} as locInfoComputedType)
  })
  let initLeft = 0, initTop = 0
  const down = (e: MouseEvent) => {
    holding.value = true;
    initLeft = e.pageX
    initTop = e.pageY
    locInfo.left = initLeft
    locInfo.top = initTop

    const rect = containerRef.value.getBoundingClientRect()
    leftBound = window.scrollX + rect.x
    rightBound = window.scrollX + rect.x + rect.width
    topBound = window.scrollY + rect.y
    bottomBound = window.scrollY + rect.y + rect.height
  };
  const up = (e: MouseEvent) => {
    if (!holding.value) {
      return;
    }
    holding.value = false;
    selecting.value = false;
    if(endHolding.value && selecting.value) {
      endHolding.value()
      window?.getSelection()?.removeAllRanges()
    }
    locInfo.width = 0
    locInfo.height = 0
  };
  const move = (e: MouseEvent) => {
    if (!holding.value) {
      return;
    }
    let x = e.pageX
    let y = e.pageY
    x < leftBound && (x = leftBound)
    x > rightBound && (x = rightBound)
    y < topBound && (y = topBound)
    y > bottomBound && (y = bottomBound)
    // 根据最小位移判定是否选区
    if(!selecting.value 
      && (Math.abs(x - initLeft) > opt.minWidth
      || Math.abs(y - initTop) > opt.minHeight)) {
      selecting.value = true
    }
    if(x > initLeft) {
      locInfo.width = x - locInfo.left
    } else {
      locInfo.left = x
      locInfo.width = initLeft - x
    }
    if(y > initTop) {
      locInfo.height = y - locInfo.top
    } else {
      locInfo.top = y
      locInfo.height = initTop - y
    }

  };

  containerRef.value.addEventListener('pointerdown', down);
  document.addEventListener('pointerup', up);
  document.addEventListener('pointermove', move);
  // 处理拖动事件
  document.addEventListener('dragstart', () => {
    holding.value = false;
    selecting.value = false;
  })
  
  const dragRect = () => {
    if (selecting.value) {
      return (
        <div
          class='b-drag-selection'
          style={{ ...locInfoComputed.value }}
        ></div>
      );
    }
  };
  render(<dragRect />, document.body);

  return {
    locInfo,
    holding,
    selecting,
    setEndHolding
  }
}

export default useDragSelect;
