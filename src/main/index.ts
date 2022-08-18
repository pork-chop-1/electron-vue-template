import { app, BrowserWindow, protocol } from 'electron';
import debug from 'electron-debug';
import initIpcMainHandler from './initIpcMainHandler'
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

// add debug function
debug();

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 1000,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
    frame: false,
    minHeight: 600,
    minWidth: 1000,
  });

  // 最大化和取消最大化 发送消息
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('isMaximizedInfo', true)
  })
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('isMaximizedInfo', false)
  })

  protocol.registerFileProtocol(
    'b-media',
    function (request, callback) {
      const url = request.url.replace(`b-media://`, '')
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
  const ses = mainWindow.webContents.session
  ses.loadExtension(
    'C:\\Users\\Tom\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\6.2.1_0',
    {allowFileAccess: true}
  )

};

app.whenReady().then(() => {
  initIpcMainHandler()

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
