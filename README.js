// Generates README file
"use strict";
var fs = require("fs");
var vm = require("vm");
var util = require("util");
var re = /((?:\/\/.*\n*)+)((?:.*\n?)+?)(?=\/\/|$)/g;
var gems = fs.readdirSync("gems");
// README introduction
console.log("#js-gems\nBecause it's awesome...\n\nGems :\n");
var i = 0;
for (var _i = 0, gems_1 = gems; _i < gems_1.length; _i++) {
    var file = gems_1[_i];
    var name_1 = file.replace(/\.js$/, "");
    console.log(++i + ". [" + name_1.replace(/-/g, " ") + "](#" + name_1 + ")");
}
// foreach gem
for (var _a = 0, gems_2 = gems; _a < gems_2.length; _a++) {
    var file = gems_2[_a];
    var name_2 = file.replace(/\.js$/, "");
    var title = name_2[0].toUpperCase() + name_2.slice(1).replace(/-/g, " ");
    var content = fs.readFileSync("gems/" + file).toString();
    // gem title
    console.log("\n## " + title + "\n");
    // prepare gem execution context and capture stdout
    var sandbox = vm.createContext({ console: {} });
    vm.runInContext("\n        console.log = (...obj) => { stdout += obj.join(\" \") + \"\\n\" }", sandbox);
    // run the main code followed by the examples    
    var m = void 0, i_1 = 0;
    while (m = re.exec(content)) {
        var _ = m[0], text = m[1], code = m[2];
        // intro text or explanation
        console.log((i_1 ? "\n- " : "") + text.replace(/^\/\/\s*/gm, "\n").trim());
        // show code
        console.log("```js\n" + code.trim() + "\n```");
        // run the code then display stdout if any and the object returned if any
        sandbox.stdout = "";
        var result = vm.runInContext(code, sandbox);
        if (sandbox.stdout)
            console.log("```\n" + sandbox.stdout.trim("\n") + "\n```");
        if (i_1++ && result)
            console.log("```js\n> " + util.inspect(result) + "\n```");
    }
}
console.log("# How to build ?\nTo generate this README from gems :\n- VS Code : <kbd>Ctrl+Shift+B</kbd>\n- sh : `tsc -w -p . & node watch.js`\n- win : use 2 shells or `start /b tsc -w -p . & node watch.js`");
function debug(obj) {
    var str = util.inspect(obj, { colors: true });
    console.log(str.replace(/\\n/g, "\n").replace(/\\t/g, "\t"));
}
