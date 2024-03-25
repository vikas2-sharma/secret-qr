import { NextApiRequest, NextApiResponse } from "next";
import sendJson, { emptyJson, userCookieField } from "../../apiutils/utils";
import { VerifyTokenCookie } from "../../apiutils/definitions";
import { saveQRData } from "../db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const cookie = req.cookies;
  console.log({ body });
  // console.log({ cookie });

  const userCookie: VerifyTokenCookie = JSON.parse(
    cookie[userCookieField] || emptyJson
  );

  console.log({ userCookie });

  const result = await saveQRData(body.rawqr, userCookie.user || "");
  console.log({ result });

  if (result.result == "success") {
    res.statusCode = 200;
    res.json({
      code: "6000",
      message: "encrypted QR generated successfully",
      encryptedqr: result.encryptedValue,
    });

    // sendJson(res, 200, "6000", "OK");
  }
}
