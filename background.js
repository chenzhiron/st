// @ts-nocheck
const { app, BrowserWindow } = require("electron")
const { join } = require("path")
const {PyShell} = require("./src/utils/pyshell.js")
// 屏蔽安全警告
// ectron Security Warning (Insecure Content-Security-Policy)
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"

let st = PyShell("main.py", {
  mode: "text",
  pythonPath: "G:\\czr\\demo\\auto_stzb\\toolkit\\python.exe",
  scriptPath: "G:\\czr\\demo\\auto_stzb",
})
st.end((err, code, signal) => {
  console.log(err, code, signal)
})
const createWindow = () => {
  const win = new BrowserWindow({
    // 窗口图标
    icon: join(__dirname, "resource/shortcut.ico"),
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      // contextIsolation: false,
      // nodeIntegration: true,
      // preload: path.join(__dirname, 'preload.js')
    },
  })
  // 加载vue url视本地环境而定，如http://localhost:5173
  // win.loadURL('http://localhost:3000')

  // development模式
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    // 开启调试台
    win.webContents.openDevTools()
  } else {
    win.loadFile(join(__dirname, "dist/index.html"))
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
