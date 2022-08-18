export { };

export interface ElectronAPI {
  setTitle: (title: string) => void,
  closeWindow: () => void
  toggleMaximize: () => boolean,
  isMaximized: () => boolean,
  setMinimize: () => void,
  isMaximizedInfo: (callback: (event: Electron.IpcRendererEvent, isMaximized: boolean)
    =>
    void) => void
  openFile: () => Promise<string | undefined>,

}

export interface StoreAPI {
  set: (key: string, value: unknown) => Promise<void>,
  get: (key: string) => Promise<unknown>,

}

declare global {
  interface Window {
    electronAPI: ElectronAPI,
    storeAPI: StoreAPI,
  }
}
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}