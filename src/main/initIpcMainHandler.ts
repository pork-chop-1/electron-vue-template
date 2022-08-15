import { BrowserWindow, ipcMain, dialog } from "electron"
import Store from 'electron-store'

function handleSetTitle(event: Electron.IpcMainEvent, title: string) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win?.setTitle(title)
}
function handleCloseWindow(event: Electron.IpcMainEvent) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win?.close()
}
function toggleMaximize(event: Electron.IpcMainEvent) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  const isMaximized = win?.isMaximized()
  if (isMaximized) {
    win?.unmaximize()
  } else {
    win?.maximize()
  }
  return !!win?.isMaximized()
}
function isMaximize(event: Electron.IpcMainEvent) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  return !!win?.isMaximized()
}
function setMinimize(event: Electron.IpcMainEvent) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win?.minimize()
}
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openFile'] })
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}

const store = new Store()

export default function initIpcMainHandler() {
  ipcMain.on('set-title', handleSetTitle)
  ipcMain.on('close-window', handleCloseWindow)
  ipcMain.on('toggle-maximize', toggleMaximize)
  ipcMain.on('is-maximized', isMaximize)
  ipcMain.on('set-minimize', setMinimize)
  ipcMain.handle('open-file', handleFileOpen)
  ipcMain.handle('set-store', (_: Electron.IpcMainInvokeEvent, key: string, value: unknown) => {
    store.set(key, value)
  })
  ipcMain.handle('get-store', (_: Electron.IpcMainInvokeEvent, key: string) => {
    return store.get(key)
  })
  
}
