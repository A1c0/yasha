import { parseInt, showUsage } from "./common.js";
import { logger } from "../../lib/console.js";
import { groupOptions } from "../../lib/argv-parsing.js";
import path from "path";
import fs from "fs";
import { isValidUrl } from "../../lib/url.js";
import { startYashaServer } from "../record-http-server.js";

/**
 * The listen command
 * @param args {object} The parsed arguments
 */
export const listen = (args) => {
  const scoopedArgs = groupOptions(
    [
      { short: "p", long: "port" },
      { short: "n", long: "name" },
      { short: "d", long: "report-dir" },
      { short: "h", long: "help" },
    ],
    args,
  );
  if (scoopedArgs?.options?.help) {
    showUsage("listen");
    return;
  }
  const host = scoopedArgs?.params?.[0];
  if (!host) {
    logger.error("No host specified. Use --help for more information.");
    process.exit(1);
  }
  if (!isValidUrl(host)) {
    logger.error(`Invalid host '${host}'. Use --help for more information.`);
    process.exit(1);
  }
  const port = parseInt("port", scoopedArgs?.options?.port) ?? 8080;
  const name = scoopedArgs?.options?.name ?? "yasha-" + Date.now();
  const outputDir = scoopedArgs?.options?.["report-dir"] ?? ".";
  const outputDirPath = path.resolve(process.cwd(), outputDir);
  try {
    fs.accessSync(outputDirPath, fs.constants.W_OK);
  } catch (err) {
    logger.error(
      `Cannot write to directory '${outputDirPath}'. Use --help for more information.`,
    );
    process.exit(1);
  }
  const stop = startYashaServer(host, port, { name, outputDir: outputDirPath });

  process.on("SIGINT", () => {
    stop();
    process.exit(0);
  });
};
