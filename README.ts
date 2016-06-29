// Generates README file

import fs = require("fs")
import vm = require("vm")
import util = require("util")

const re = /((?:\/\/.*\n*)+)((?:.*\n?)+?)(?=\/\/|$)/g
const gems = fs.readdirSync("gems")

// README introduction
console.log(
    `#js-gems
Because it's awesome...

Gems :
`)

let i = 0
for (let file of gems) {
    let name = file.replace(/\.js$/, "")
    console.log(`${++i}. [${name.replace(/-/g, " ")}](#${name})`)
}

// foreach gem
for (let file of gems) {
    let name = file.replace(/\.js$/, "")
    let title = name[0].toUpperCase() + name.slice(1).replace(/-/g, " ")
    let content = fs.readFileSync(`gems/${file}`).toString()

    // gem title
    console.log(`\n## ${title}\n`)

    // prepare gem execution context and capture stdout
    let sandbox = vm.createContext({ console: {} })
    vm.runInContext(`
        console.log = (...obj) => { stdout += obj.join(" ") + "\\n" }`, sandbox)

    // run the main code followed by the examples    
    let m, i = 0
    while (m = re.exec(content)) {
        let [_, text, code] = m

        // intro text or explanation
        console.log((i ? "\n- " : "") + text.replace(/^\/\/\s*/gm, "\n").trim())
        // show code
        console.log("```js\n" + code.trim() + "\n```")

        // run the code then display stdout if any and the object returned if any
        sandbox.stdout = ""
        let result = vm.runInContext(code, sandbox)
        if (sandbox.stdout)
            console.log("```\n" + sandbox.stdout.trim("\n") + "\n```")
        if (i++ && result)
            console.log("```js\n> " + util.inspect(result) + "\n```")
    }
}

console.log(`# How to build ? (generate this README from gems)

- VS Code : <kbd>Ctrl+Shift+B</kbd>
- sh : \`tsc -w -p . & node watch.js\`
- win : use 2 shells or \`start tsc -w -p . & node watch.js\``)

function debug(obj) {
    let str = util.inspect(obj, { colors: true })
    console.log(str.replace(/\\n/g, "\n").replace(/\\t/g, "\t"))
}
