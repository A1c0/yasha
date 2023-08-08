#!/usr/bin/env node

module.exports.promise = import("../app/cli/index.js").then((module) =>
  module.default(process.argv.slice(2)),
);
