import { NextApiRequest, NextApiResponse } from "next";
import sendJson from "../../apiutils/utils";
import { VerifyTokenCookie } from "../definitions";
import { saveQRData } from "../db/db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  const cookie = req.cookies;
  console.log({ body });
  // console.log({ cookie });

  const userCookie: VerifyTokenCookie = JSON.parse(
    cookie["User-cookie"] || "{}"
  );

  console.log({ userCookie });

  saveQRData(body.rawqr, userCookie.user || "");

  sendJson(res, 200, "6000", "OK");
}
