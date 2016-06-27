"use strict";
var fs = require("fs");
var cp = require("child_process");
rebuild(); // initial rebuild
fs.watch("README.js", debounce);
fs.watch("gems", debounce);
var timer;
function debounce(event, filename) {
    log(event, filename);
    clearTimeout(timer);
    timer = setTimeout(rebuild, 50);
}
function rebuild() {
    log("rebuild");
    try {
        cp.execSync("node README.js > README.md");
    }
    catch (error) {
        log("ERROR:", error);
    }
}
function log() {
    var message = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        message[_i - 0] = arguments[_i];
    }
    var now = new Date();
    console.log(now.toISOString() + ": " + message.join(" "));
}
