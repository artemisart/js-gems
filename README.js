"use strict";
var fs = require("fs");
var vm = require("vm");
var util = require("util");
var re = /((?:\/\/.*\n*)*)([^]+?)(?=\/\/|$)/g;
// README introduction
console.log("#js-gems\nBecause it's awesome...");
var i = 0;
for (var _i = 0, gems_1 = gems; _i < gems_1.length; _i++) {
    var file = gems_1[_i];
    console.log(++i + ". " + file.replace(/-/g, " ").replace(/\.js$/, ""));
}
// foreach gem
for (var _i = 0, _a = fs.readdirSync("gems"); _i < _a.length; _i++) {
    var file = _a[_i];
    var name_1 = file.split(".")[0]; // TODO remove only after last dot
    var title = name_1[0].toUpperCase() + name_1.slice(1).replace(/-/g, " ");
    var content = fs.readFileSync("gems/" + file).toString();
    // gem title
    console.log("\n## " + title + "\n");
    // prepare gem execution context and capture stdout
    var sandbox = vm.createContext({ console: {} });
    vm.runInContext("\n        console.log = (...obj) => { stdout += obj.join(\" \") + \"\\n\" }", sandbox);
    // run the main code followed by the examples    
    var m = void 0, i = 0;
    while (m = re.exec(content)) {
        var _ = m[0], text = m[1], code = m[2];
        // intro text or explanation
        console.log((i ? "\n- " : "") + text.replace(/^\/\/\s*/gm, "\n").trim());
        // show code
        console.log("```js\n" + code.trim() + "\n```");
        // run the code then display stdout if any and the object returned if any
        sandbox.stdout = "";
        var result = vm.runInContext(code, sandbox);
        if (sandbox.stdout)
            console.log("```\n" + sandbox.stdout.trim("\n") + "\n```");
        if (i++ && result)
            console.log("```js\n> " + util.inspect(result) + "\n```");
    }
}
function debug(obj) {
    var str = util.inspect(obj, { colors: true });
    console.log(str.replace(/\\n/g, "\n").replace(/\\t/g, "\t"));
}
