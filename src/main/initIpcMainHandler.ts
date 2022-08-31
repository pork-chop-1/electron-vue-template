import { BrowserWindow, ipcMain, dialog } from "electron"
import Store from 'electron-store'

/** 用于render线程发送新标题，用于主线程设置 */
function handleSetTitle(event: Electron.IpcMainEvent, title: string) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win?.setTitle(title)
}
/** 用于render线程发送关闭窗口信息，并由主线程执行 */
function handleCloseWindow(event: Electron.IpcMainEvent) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win?.close()
}
/** 
 * render线程发送切换窗口最大化，并且返回切换后的状态 
 * @result 是否最大化
 * */
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
/** 
 * render线程询问当前窗口是否最大化
 * @result 是否最大化
 * */
function isMaximize(event: Electron.IpcMainEvent) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  return !!win?.isMaximized()
}
/** 
 * render线程询问当前窗口是否最小化
 * @result 是否最小化
 */
function setMinimize(event: Electron.IpcMainEvent) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win?.minimize()
}

/**
 * 用于render线程和main线程的双向通信
 * 打开选择文件框，选择后返回文件的路径
 */
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
  // 从render线程到main线程的单向通讯
  ipcMain.on('set-title', handleSetTitle)
  ipcMain.on('close-window', handleCloseWindow)
  ipcMain.on('toggle-maximize', toggleMaximize)
  ipcMain.on('is-maximized', isMaximize)
  ipcMain.on('set-minimize', setMinimize)

  // 用于render线程和main线程的双向通信
  ipcMain.handle('open-file', handleFileOpen)
  ipcMain.handle('set-store', (_: Electron.IpcMainInvokeEvent, key: string, value: unknown) => {
    store.set(key, value)
  })
  ipcMain.handle('get-store', (_: Electron.IpcMainInvokeEvent, key: string) => {
    return store.get(key)
  })
  
}
