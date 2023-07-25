import fs from "fs";
import path from "path";

const padding = (n) => "  ".repeat(n);

export class Writer {
  terminate() {
    this.writeStream.write(`\n${padding(1)}]\n}`);
    this.writeStream.end();
  }

  constructor(name, outputDir) {
    this.timestamp = Date.now();
    this.writeStream = fs.createWriteStream(
      path.resolve(outputDir, `${name}-${this.timestamp}.json`),
    );
    this.writeStream.write(`{\n${padding(1)}"timestamp": "${this.timestamp}",`);
    this.writeStream.write(`\n${padding(1)}"requests": [`);
  }

  /**
   * Writes a JSON object to the file
   * @param obj {object} - the object to write
   * @returns {void}
   */
  writeJson(obj) {
    this.writeStream.write("\n");
    this.writeStream.write(JSON.stringify(obj));
    this.writeStream.write(",");
  }
}
