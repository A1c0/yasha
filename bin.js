#!/usr/bin/env node

import { parsedArgs } from "./lib/argv-parsing.js";
import { useCli } from "./app/cli.js";

useCli(parsedArgs(process.argv.slice(2)));
