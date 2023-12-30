"use strict";
const { app, BrowserWindow, ipcMain } = require("electron");
const { join } = require("path");
const { readYAML } = require("./src/utils/regyaml.js");
const { PyShell } = require("./src/utils/pyshell.js");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
const yarmlData = readYAML("./config.yaml");
const webPort = yarmlData.Web.url;
PyShell(
  "main.py",
  {
    mode: "text",
    pythonPath: join("G:\\czr\\demo\\auto_stzb", yarmlData.Python.executable),
    pythonOptions: ["-u"],
    scriptPath: "G:\\czr\\demo\\auto_stzb"
  },
  (msg) => {
    console.log("msg", msg);
  },
  (err) => {
    console.log("err", err);
  }
);
const createWindow = () => {
  const win = new BrowserWindow({
    // 窗口图标
    icon: join(__dirname, "resource/shortcut.ico"),
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: join(__dirname, "preload.js")
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(join(__dirname, "dist/index.html"));
  }
};
app.whenReady().then(() => {
  ipcMain.handle("start:web", () => {
    return webPort;
  });
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
