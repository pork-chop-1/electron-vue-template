import { PiniaPlugin, PiniaPluginContext } from "pinia"

// https://pinia.vuejs.org/core-concepts/plugins.html#typing-new-store-properties
declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: boolean
  }
}

// 灵感来自"pinia-plugin-persist": "^1.0.0",
const StoragePlugin: PiniaPlugin = function (context: PiniaPluginContext) {

  const { store, options } = context
  // 在单个store中是否添加了persist标志
  if (options.persist) {
    const key = context.store.$id
    const storage = window.storeAPI
    const storageResult = storage.get(key)
    // 每次创建的时候从storage中读取
    storageResult.then((v) => {
      if (v != null) {
        store.$patch(JSON.parse(v as string))
        window.storeAPI.set(key, JSON.stringify(store))
      }
    })
    // 每当store发生变化，写入storage
    store.$subscribe(() => {
      window.storeAPI.set(key, JSON.stringify(store))
    })
  }
}

export default StoragePlugin