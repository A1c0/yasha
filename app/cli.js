import fs from "fs";
import path from "path";
import { parsedArgs } from "../lib/argv-parsing.js";

// const stopServer = startYashaServer("http://127.0.0.1:8080", 8081, {
//   name: "test",
//   outputDir: "reports",
// });

// process.on("exit", (code) => {
//   console.log(`Exiting with code ${code}...`);
//   stopServer();
//   process.exit(code);
// });

export const useCli = (argv) => {
  const args = parsedArgs(argv);
  console.log(args);
  if (args?.options?.help) {
    console.log("Usage: yasha <command> [options]");
    fs.createReadStream(
      path.resolve(__dirname, "../assets/usage/global.txt"),
    ).pipe(process.stdout);
  }
};
