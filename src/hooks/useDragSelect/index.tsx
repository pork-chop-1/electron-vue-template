import { Ref, render, ref, reactive, computed, watch, App, getCurrentInstance, nextTick, h } from "vue";
import { BSelection, locInfoType } from "@/components/BSelection";

const SELECT_ITEM_STATES = {
  SELECTING: "__selecting",
  UNSELECTED: "__unselected",
  SELECTED: "__selected",
  DEFAULT: "",
};

/**
 * @param{HTMLElement} element
 **/
function checkIsInside(element: HTMLElement, rect: locInfoType) {
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
  let _opt = Object.assign(
    { minHeight: 30, minWidth: 2000 },
    opt
  ) as dragOptionType;
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
    console.log(v);
  });

  const appContext = getCurrentInstance()?.appContext || null;
  const container = document.createElement("div");
  const dragSelect = <BSelection selecting={selecting} />;
  render(dragSelect, container);
  // dragSelect.appContext = appContext
  document.body.appendChild(container);
  // const dragSelectInstance = dragSelect.component

  const locInfo = dragSelect.component?.exposed?.locInfo as locInfoType;

  type endHoldingType = (
    selectedEl: HTMLElement[],
    selectStatus: boolean[]
  ) => void;
  const endHolding = ref<endHoldingType>();
  const setEndHolding = (callback: endHoldingType) => {
    endHolding.value = callback;
  };

  // container边界
  let leftBound = 0,
    rightBound = 0,
    topBound = 0,
    bottomBound = 0;

  let initLeft = 0,
    initTop = 0;

  // 当前选中以及上次选中，上次选中用于unselected
  let _statusList: boolean[] | undefined;
  let _prevStatusList: boolean[] | undefined;
  const down = async (e: MouseEvent) => {
    if (e.button !== 0) {
      return;
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
  const up = async (e: MouseEvent) => {
    if (e.button !== 0) {
      return;
    }
    if (!holding.value) {
      return;
    }
    console.log(holding.value, selecting.value);
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
    _prevStatusList = _statusList;
    locInfo.width = 0;
    locInfo.height = 0;


  };
  const move = async (e: MouseEvent) => {
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
      _activeEffect();
    }


  };

  console.log(dragSelect);

  const _changeStatus = (el: HTMLElement, status?: string) => {
    el.classList.remove(SELECT_ITEM_STATES.SELECTING);
    el.classList.remove(SELECT_ITEM_STATES.UNSELECTED);
    el.classList.remove(SELECT_ITEM_STATES.SELECTED);
    status && el.classList.add(status);
  };
  const _activeEffect = () => {
    _statusList = childrenRef.value?.map((item) =>
      checkIsInside(item, locInfo)
    );
    const list = childrenRef.value;
    if (
      !_statusList ||
      !list ||
      _prevStatusList?.toString() === _statusList.toString()
    ) {
      return;
    }
    for (let i = 0, l = _statusList.length; i < l; i++) {
      // selecting
      if (_statusList[i]) {
        _changeStatus(list[i], SELECT_ITEM_STATES.SELECTING);
      } else if (!_statusList[i] && _prevStatusList && _prevStatusList[i]) {
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
      checkIsInside(item, locInfo)
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

  return {
    locInfo,
    holding,
    selecting,
    setEndHolding,
  };
}

export default useDragSelect;
