import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { VerifyTokenCookie } from "../definitions";
import { verify } from "jsonwebtoken";
import sendJson from "../../apiutils/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = req.headers.cookie || "";

  console.log(
    "headers",
    JSON.parse(JSON.parse(JSON.stringify(req.headers))["user-cookie"])
  );

  const tokenCookie: VerifyTokenCookie = JSON.parse(
    JSON.parse(JSON.stringify(req.headers))["user-cookie"] || {}
  );

  if (!tokenCookie) {
    console.log("no cookie 3");
    sendJson(res, 401, "6402", "not logged in");
    return;
  }
  //   console.log({ user: tokenCookie.user });
  //   console.log({ token: tokenCookie.token });

  try {
    const jwt = verify(tokenCookie.token, process.env.JSON_TOKEN_SERCRET || "");
    console.log("token verified");
    sendJson(res, 200, "6000", "verified");
  } catch (e) {
    console.log("token expired ");
    sendJson(res, 401, "6401", "token expired");
  }
}
