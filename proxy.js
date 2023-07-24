import http from "http";

import { request } from "./client.js";
import { getBody } from "./util.js";

const host = "localhost";
const port = 8000;

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
  const result = await request(`http://localhost:8001${url}`, method, body);
  console.log(result);
  res.writeHead(result.statusCode, result.headers);
  res.end(result.data);
};

const server = http.createServer(onRequest);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
