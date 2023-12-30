const { contextBridge, ipcRenderer } = require("electron/renderer")

contextBridge.exposeInMainWorld("electronAPI", {
  startWeb: () => ipcRenderer.invoke("start:web"),
})
