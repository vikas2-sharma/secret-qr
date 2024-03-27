import { NextApiRequest, NextApiResponse } from "next";
import sendJson from "../../apiutils/utils";
import {
  DecryptQRReq,
  HTTP_METHOD_NOT_ALLOWED,
  HTTP_OK,
} from "../../apiutils/definitions";
import { getDecryptQr } from "../db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    sendJson(
      res,
      HTTP_METHOD_NOT_ALLOWED,
      "6001",
      `http: ${req.method} method not allowed`
    );
  }

  const body: DecryptQRReq = req.body;
  console.log(body.qrdata);
  const decryptedQr = await getDecryptQr(body.qrdata);

  res.statusCode = 200;
  res.json(decryptedQr);

  //   sendJson(res, HTTP_OK, "6000", "ok");
}
