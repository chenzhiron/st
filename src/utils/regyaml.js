const fs = require("fs")
const yaml = require("js-yaml")

function readYAML(filePath) {
  try {
    // 同步读取文件内容
    const fileContents = fs.readFileSync(filePath, "utf8")
    // 解析YAML内容
    const data = yaml.load(fileContents)
    return data
  } catch (e) {
    console.error("Failed to read or parse YAML file:", e)
    return null
  }
}
module.exports = {
	readYAML
}
