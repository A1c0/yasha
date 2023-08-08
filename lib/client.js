import http from "http";

export const request = (url, method, headers, dataToSend) =>
  new Promise((resolve, reject) => {
    const req = http
      .request(url, { method, headers }, (res) => {
        let dataReceived = [];
        res.on("data", (chunk) => {
          dataReceived.push(chunk);
        });
        res.on("end", () => {
          resolve({
            data: Buffer.concat(dataReceived),
            statusCode: res.statusCode,
            headers: res.headers,
          });
        });
      })
      .on("error", (err) => {
        reject({ err });
      });
    req.write(dataToSend);
    req.end();
  });
