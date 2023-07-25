#!/usr/bin/env node

import { runListenYashaServer } from "./lib/server.js";

// const args = parsedArgs(process.argv.slice(2));

const stopServer = runListenYashaServer("http://127.0.0.1:8080", 8081, {
  name: "test",
  outputDir: "reports",
});

process.on("SIGINT", () => {
  console.log("SIGINT received");
  stopServer();
  process.exit(0);
});
