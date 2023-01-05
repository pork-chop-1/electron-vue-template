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
    height: 800,
    width: 1400,
    webPreferences: {
      // 是由electron forge webpack插件提供的preload路径
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
    // 表示不需要系统自动提供的外边框，需要自己实现
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

  // 由于electron安全支持的原因，不能直接访问文件系统，而是需要自己定义一个协议
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

  // 开启后，自动打开开发者工具
  // mainWindow.webContents.openDevTools();

  // 加载vue开发工具
  const ses = mainWindow.webContents.session
  ses.loadExtension(
    'C:\\Users\\Tom\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\6.4.5_0',
    {allowFileAccess: true}
  )

  // https://stackoverflow.com/questions/55561808/vue-electron-devtools-throwing-exception
  // Open dev tools initially when in development mode
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.on("did-frame-finish-load", () => {
      mainWindow.webContents.once("devtools-opened", () => {
        mainWindow.focus();
      });
      mainWindow.webContents.openDevTools();
    });
  }
};

app.whenReady().then(() => {
  // 用于初始化与render通信
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
