const { PythonShell } = require("python-shell")
const treeKill = require("tree-kill")

function PyShell(start_name, options, msg, err) {
  const pyshell = new PythonShell(start_name, options)
  pyshell.on("message", msg)
  pyshell.on("stderr", err)
  return pyshell
}
module.exports = {
  PyShell
}
