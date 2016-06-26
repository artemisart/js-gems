import fs = require("fs")
import vm = require("vm")
import util = require("util")

const main_re = /((?:\/\/.*\n*)*)([^]*)/
const examples_re = /((?:\/\/.*\n*)*)([^]+?)(?=\/\/|$)/g

// README introduction
console.log(
    `#js-gems
Because it's awesome...`)

// TODO ToC

// foreach gem
for (let file of fs.readdirSync("gems")) {
    let name = file.split(".")[0]
    let title = name[0].toUpperCase() + name.slice(1).replace(/-/g, " ")
    let content = fs.readFileSync(`gems/${file}`).toString()
    let [main, examples] = content.split(/\/\/\s+Example/)

    // debug([main, examples])

    // gem title    
    console.log(`\n## ${title}\n`)

    let sandbox = vm.createContext()
    let i = 0

    let [_, text, code] = main_re.exec(main)
    console.log(text.trim())
    console.log("\n\t" + code.trim().replace(/\n/g, "\n\t"))
    run(code, sandbox)

    let m    
    while (m = examples_re.exec(examples)) {
        let [_, text, code] = m
        console.log(text.trim())
        console.log("\n\t" + code.trim().replace(/\n/g, "\n\t"))
        run(code, sandbox)
    }    
}

function run(script, sandbox) {
    console.log(vm.runInContext(script, sandbox))
}

function debug(obj) {
    let str = util.inspect(obj, { colors: true })
    console.log(str.replace(/\\n/g, "\n").replace(/\\t/g, "\t"))
}