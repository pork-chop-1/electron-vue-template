import { app, BrowserWindow, ipcMain, dialog, protocol } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
    frame: false,

  });

  // 最大化和取消最大化 发送消息
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('isMaximizedInfo', true)
  })
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('isMaximizedInfo', false)
  })

  protocol.registerFileProtocol(
    'your-custom-protocol',
    function (request, callback) {
      const url = request.url.replace(`your-custom-protocol://`, '')
      try {
        return callback(decodeURIComponent(url))
      }
      catch (error) {
        // Handle the error as needed
        console.error(error)
      }
    },
  );
  // 设置源
  // https://stackoverflow.com/questions/51969512/define-csp-http-header-in-electron-app
  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: Object.assign({
  //       "Content-Security-Policy": ["default-src 'self'"]
  //     }, details.responseHeaders)
  //   });
  // });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.openDevTools();
  // const ses = mainWindow.webContents.session
  // ses.loadExtension('C:\\Users\\Tom\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\6.2.1_0')

  // const template = [
  //   {
  //     label: 'file',
  //     submenu: [
  //       {
  //         label: 'new',
  //         click() {
  //           const newWindow = new BrowserWindow({
  //             width: 500,
  //             height: 500,
  //           })
  //           newWindow.loadURL('http://baidu.com')
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     label: 'about'
  //   }
  // ]
  // const menu = Menu.buildFromTemplate(template)
  // Menu.setApplicationMenu(menu)
};
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

app.whenReady().then(() => {
  ipcMain.on('set-title', handleSetTitle)
  ipcMain.on('close-window', handleCloseWindow)
  ipcMain.on('toggle-maximize', toggleMaximize)
  ipcMain.on('is-maximized', isMaximize)
  ipcMain.on('set-minimize', setMinimize)
  ipcMain.handle('open-file', handleFileOpen)

  createWindow()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
