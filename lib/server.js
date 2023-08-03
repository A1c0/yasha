import http from "http";

import { request } from "./client.js";
import { Writer } from "./writer.js";
import { parseJson } from "./json-parser.js";

/**
 * Returns the body of a request
 *
 * @param req {IncomingMessage} - the request
 * @returns {Promise<Buffer>} - the body of the request
 */
export const getBody = (req) =>
  new Promise((resolve, reject) => {
    let body = [];
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        resolve(Buffer.concat(body));
      })
      .on("error", (err) => {
        reject(err);
      });
  });

/**
 * Runs the Yasha server
 * @param listeningBaseUrl {string} - the base url to listen to
 * @param port {number} - the port to listen to
 * @param report {object} - the report
 * @param report.name {string} - the name of the report
 * @param report.outputDir {string} - the directory to write the report to
 * @return {function(): void} - a function to stop the server
 */
export const startYashaServer = (listeningBaseUrl, port, report) => {
  const writer = new Writer(report.name, report.outputDir);

  /**
   * Handles the request
   * @param req {IncomingMessage} - the request
   * @param res {ServerResponse} - the response
   * @returns {Promise<void>}
   */
  const onRequest = async (req, res) => {
    const url = req.url;
    const method = req.method;
    const body = await getBody(req);
    const result = await request(`${listeningBaseUrl}${url}`, method, body);
    writer.writeJson({
      url,
      method,
      body: parseJson(body),
      expectedResult: {
        statusCode: result.statusCode,
        headers: result.headers,
        body: parseJson(result.data),
      },
    });
    res.writeHead(result.statusCode, result.headers);
    res.end(result.data);
  };

  const server = http.createServer(onRequest);
  server.listen(port, () => {
    console.log(`Yasha server listening on http://localhost:${port}`);
  });

  return () => {
    writer.terminate();
    server.close();
  };
};
