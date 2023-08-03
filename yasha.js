#!/usr/bin/env node

import { startYashaServer } from "./lib/server.js";

// const args = parsedArgs(process.argv.slice(2));

const stopServer = startYashaServer("http://127.0.0.1:8080", 8081, {
  name: "test",
  outputDir: "reports",
});

process.on("exit", (code) => {
  console.log(`Exiting with code ${code}...`);
  stopServer();
  process.exit(code);
});
