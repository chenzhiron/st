// @ts-nocheck
const { PythonShell } = require("python-shell")
const treeKill = require("tree-kill")

function PyShell(start_name, options) {
  const pyshell = new PythonShell(start_name, options)
  pyshell.on('message', function (msg) {
    console.log(msg)
  })
  pyshell.on('stderr', function (msg) {
    console.error(msg)
  })
  return pyshell
}
// class PyShell extends PythonShell {
//   constructor(script, args) {
//     const options = {
//       mode: "text",
//       args: args,
//       pythonPath: "G:czrAutoStzbAutoStzb\toolkit\python.exe",
//       scriptPath: "G:\czr\AutoStzb\AutoStzb\main.py",
//     }
//     super(script, options)
//   }

//   on(event, listener) {
//     this.removeAllListeners(event)
//     super.on(event, listener)
//     return this
//   }

//   kill(callback) {
//     treeKill(this.childProcess.pid, "SIGTERM", callback)
//     return this
//   }
// }
module.exports = {
  PyShell
}
