import { HexColor } from "../lib/console.js";

const HttpMethod = (value) => {
  switch (value) {
    case "GET":
      return HexColor("#54a454")("GET    ");
    case "POST":
      return HexColor("#516ea2")("POST   ");
    case "PUT":
      return HexColor("#b7bb5c")("PUT    ");
    case "PATCH":
      return HexColor("#9f824d")("PATCH  ");
    case "DELETE":
      return HexColor("#9d5353")("DELETE ");
    default:
      return HexColor("#808080")(value.toUpperCase());
  }
};

export const logRequest = (method, host, endpoint, statusCode) => {
  const color = statusCode >= 400 ? "#9d5353" : "#54a454";
  console.log(
    `${HttpMethod(method)} ${HexColor("#808080")(host)}${endpoint} ${HexColor(
      color,
    )(`(${statusCode})`)}`,
  );
};

export const yashaLog = (message) => {
  console.log(HexColor("#c590d7")(message));
};
