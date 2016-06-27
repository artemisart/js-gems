import fs = require("fs")
import cp = require("child_process")

rebuild() // initial rebuild
fs.watch("README.js", debounce)
fs.watch("gems", debounce)

let timer
function debounce(event, filename) {
    log(event, filename)
    clearTimeout(timer)
    timer = setTimeout(rebuild, 50)
}

function rebuild() {
    log("rebuild")
    try {
        cp.execSync("node README.js > README.md")
    } catch (error) {
        log("ERROR:", error)
    }
}

function log(...message) {
    let now = new Date()
    console.log(`${now.toISOString()}: ${message.join(" ")}`)
}
