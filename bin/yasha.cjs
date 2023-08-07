#!/usr/bin/env node

import {parsedArgs} from "../lib/argv-parsing.js";


function runCli(useCli) {
    return useCli(parsedArgs(process.argv.slice(2)));;
}

var dynamicImport = new Function("module", "return import(module)");

module.exports.promise = dynamicImport("../src/cli/index.js").then(runCli);
