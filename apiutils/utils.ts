import { NextApiResponse } from "next";

export default function sendJson(
  res: NextApiResponse,
  httpCode: number,
  responseCode: String,
  responseMessage: String
) {
  res.statusCode = httpCode;
  res.json({ code: responseCode, message: responseMessage });
}
