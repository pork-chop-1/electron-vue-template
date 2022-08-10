export { }

export interface ElectronAPI {
  setTitle: (title: string) => void,
  closeWindow: () => void
  toggleMaximize: () => boolean,
  isMaximized: () => boolean,
  setMinimize: () => void,
  isMaximizedInfo: (callback: (event: Electron.IpcRendererEvent, isMaximized: boolean) => void) => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}