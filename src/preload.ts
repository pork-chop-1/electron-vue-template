// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title:string) => ipcRenderer.send('set-title', title),
  closeWindow: () => ipcRenderer.send('close-window'),
  toggleMaximize: () => ipcRenderer.send('toggle-maximize'),
  isMaximized: () => ipcRenderer.send('is-maximized'),
  setMinimize: () => ipcRenderer.send('set-minimize'),
  isMaximizedInfo: (callback: (event: Electron.IpcRendererEvent, isMaximized: boolean) => void) => ipcRenderer.on('update-counter', callback)
})
