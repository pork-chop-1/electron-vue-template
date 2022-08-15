// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

type isMaximizedInfoCallbackType = (event: Electron.IpcRendererEvent, isMaximized: boolean) => void

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title: string) => ipcRenderer.send('set-title', title),
  closeWindow: () => ipcRenderer.send('close-window'),
  toggleMaximize: () => ipcRenderer.send('toggle-maximize'),
  isMaximized: () => ipcRenderer.send('is-maximized'),
  setMinimize: () => ipcRenderer.send('set-minimize'),
  isMaximizedInfo: (callback: isMaximizedInfoCallbackType) => 
    ipcRenderer.on('isMaximizedInfo', callback),
  openFile: () => ipcRenderer.invoke('open-file'),
})
contextBridge.exposeInMainWorld('storeAPI', {
  set: (key: string, value: unknown) => ipcRenderer.invoke('set-store', key, value),
  get: (key: string) => ipcRenderer.invoke('get-store', key),

});