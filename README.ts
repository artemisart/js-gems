import fs = require("fs")
import vm = require("vm")
import util = require("util")

const re = /((?:\/\/.*\n*)*)([^]+?)(?=\/\/|$)/g

// README introduction
console.log(
    `#js-gems
Because it's awesome...`)

// TODO ToC

// foreach gem
for (let file of fs.readdirSync("gems")) {
    let name = file.split(".")[0] // TODO remove only after last dot
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

function debug(obj) {
    let str = util.inspect(obj, { colors: true })
    console.log(str.replace(/\\n/g, "\n").replace(/\\t/g, "\t"))
}
