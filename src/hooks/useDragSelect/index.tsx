import { Ref, render, ref, reactive, computed, watch } from "vue";

const SELECT_ITEM_STATES = {
  SELECTING: "__selecting",
  UNSELECTED: "__unselected",
  SELECTED: "__selected",
  DEFAULT: "",
};

type locInfoComputedType = {
  left: number;
  top: number;
  width: number;
  height: number;
};
/**
 * @param{HTMLElement} element
 **/
function checkIsInside(element: HTMLElement, rect: locInfoComputedType) {
  if (!rect) return false;
  const bounding = element.getBoundingClientRect();
  const x1 = window.scrollX + bounding.left,
    x2 = x1 + bounding.width,
    y1 = window.scrollY + bounding.top,
    y2 = y1 + bounding.height;
  // a1 < x2 a2 > x1 b1
  let a1, a2, b1, b2;
  // 处理x1在左上方
  a1 = rect.left;
  a2 = rect.left + rect.width;
  b1 = rect.top;
  b2 = rect.top + rect.height;
  return a1 < x2 && a2 > x1 && b1 < y2 && b2 > y1;
}

type dragOptionType = {
  minHeight: number;
  minWidth: number;
};

function useDragSelect(
  containerRef: Ref<HTMLElement>,
  childrenRef: Ref<HTMLElement[] | undefined>,
  opt?: dragOptionType
) {
  let _opt = Object.assign({ minHeight: 30, minWidth: 2000 }, opt) as dragOptionType;
  // 是否正在拖拽
  const holding = ref(false);
  // 显示选框
  const selecting = ref(false);

  watch(selecting, (v) => {
    if (v) {
      containerRef.value.style.userSelect = "none";
      window?.getSelection()?.removeAllRanges();
    } else {
      containerRef.value.style.userSelect = "auto";
    }
  });
  const locInfo = reactive({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  type endHoldingType = (selectedEl: HTMLElement[], selectStatus: boolean[]) => void;
  const endHolding = ref<endHoldingType>();
  const setEndHolding = (callback: endHoldingType) => {
    endHolding.value = callback;
  };

  // container边界
  let leftBound = 0,
    rightBound = 0,
    topBound = 0,
    bottomBound = 0;

  type keyofLocInfo = keyof typeof locInfo;
  // 计算根据locInfo转换为px
  const locInfoComputed = computed(() => {
    return Object.keys(locInfo).reduce((pre, cur) => {
      pre[cur as keyof locInfoComputedType] =
        locInfo[cur as keyofLocInfo] === 0
          ? locInfo[cur as keyofLocInfo]
          : locInfo[cur as keyofLocInfo];
      return pre;
    }, {} as locInfoComputedType);
  });
  let initLeft = 0,
    initTop = 0;
  let _statusList: boolean[] | undefined;
  const down = (e: MouseEvent) => {
    if(e.button !== 0) {
      return
    }
    holding.value = true;
    initLeft = e.pageX;
    initTop = e.pageY;
    locInfo.left = initLeft;
    locInfo.top = initTop;

    const rect = containerRef.value.getBoundingClientRect();
    leftBound = window.scrollX + rect.x;
    rightBound = window.scrollX + rect.x + rect.width;
    topBound = window.scrollY + rect.y;
    bottomBound = window.scrollY + rect.y + rect.height;
  };
  const up = (e: MouseEvent) => {
    if (e.button !== 0) {
      return;
    }
    if (!holding.value) {
      return;
    }
    holding.value = false;
    selecting.value = false;
    _doneEffect();
    if (endHolding.value) {
      const list = childrenRef.value || [],
        statusList = _statusList || [];
      endHolding.value(
        list.filter((v, i) => statusList[i]),
        statusList
      );
      window?.getSelection()?.removeAllRanges();
    }
    _statusList = undefined;
    locInfo.width = 0;
    locInfo.height = 0;
  };
  const move = (e: MouseEvent) => {
    if (!holding.value) {
      return;
    }
    let x = e.pageX;
    let y = e.pageY;
    x < leftBound && (x = leftBound);
    x > rightBound && (x = rightBound);
    y < topBound && (y = topBound);
    y > bottomBound && (y = bottomBound);
    // 根据最小位移判定是否选区
    if (
      !selecting.value &&
      (Math.abs(x - initLeft) > _opt.minWidth ||
        Math.abs(y - initTop) > _opt.minHeight)
    ) {
      selecting.value = true;
    }
    if (x > initLeft) {
      locInfo.width = x - locInfo.left;
    } else {
      locInfo.left = x;
      locInfo.width = initLeft - x;
    }
    if (y > initTop) {
      locInfo.height = y - locInfo.top;
    } else {
      locInfo.top = y;
      locInfo.height = initTop - y;
    }
    if (selecting.value) {
      _activeEffect()
    };
  };

  const _changeStatus = (el: HTMLElement, status?: string) => {
    el.classList.remove(SELECT_ITEM_STATES.SELECTING);
    el.classList.remove(SELECT_ITEM_STATES.UNSELECTED);
    el.classList.remove(SELECT_ITEM_STATES.SELECTED);
    status && el.classList.add(status);
  };
  const _activeEffect = () => {
    const prevStatusList = _statusList;
    _statusList = childrenRef.value?.map((item) =>
      checkIsInside(item, locInfoComputed.value)
    );
    const list = childrenRef.value;
    if (
      !_statusList ||
      !list ||
      prevStatusList?.toString() === _statusList.toString()
    ) {
      return;
    }
    for (let i = 0, l = _statusList.length; i < l; i++) {
      // selecting
      if (_statusList[i]) {
        _changeStatus(list[i], SELECT_ITEM_STATES.SELECTING);
      } else if (!_statusList[i] && list[i]) {
        // UNSELECTED
        _changeStatus(list[i], SELECT_ITEM_STATES.UNSELECTED);
      } else {
        // DEFAULT
        _changeStatus(list[i]);
      }
    }
  };
  const _doneEffect = () => {
    _statusList = childrenRef.value?.map((item) =>
      checkIsInside(item, locInfoComputed.value)
    );
    const list = childrenRef.value;
    if (!_statusList || !list) {
      return;
    }
    for (let i = 0, l = _statusList.length; i < l; i++) {
      // selecting
      if (_statusList[i]) {
        _changeStatus(list[i], SELECT_ITEM_STATES.SELECTED);
      } else {
        // DEFAULT
        _changeStatus(list[i]);
      }
    }
  };

  containerRef.value.addEventListener("mousedown", down);
  document.addEventListener("mouseup", up);
  document.addEventListener("mousemove", move);
  // 处理拖动事件
  document.addEventListener("dragstart", () => {
    holding.value = false;
    selecting.value = false;
  });

  const dragRect = () => {
    if (selecting.value) {
      return (
        <div
          class="b-drag-selection"
          style={{
            width: locInfoComputed.value.width + "px",
            height: locInfoComputed.value.height + "px",
            left: locInfoComputed.value.left + "px",
            top: locInfoComputed.value.top + "px",
          }}
        ></div>
      );
    }
  };
  render(<dragRect />, document.body);

  return {
    locInfo,
    holding,
    selecting,
    setEndHolding,
  };
}

export default useDragSelect;
