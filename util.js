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
