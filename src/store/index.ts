import { createPinia } from 'pinia';
import type { App } from 'vue';
import StoragePlugin from './StoragePlugin';

const store = createPinia();
store.use(StoragePlugin)

export function setupStore(app: App) {
  app.use(store);
}

export { store };
