import { NextApiRequest, NextApiResponse } from "next";
import { sendJson } from "../apiutils/utils";
import { parse } from "cookie";
import { VerifyTokenCookie } from "../definitions";
import { verify } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = req.headers.cookie || "";
  console.log(cookies);
  const parsedCookie = parse(cookies);
  if (!parsedCookie) {
    console.log("no cookie ");
    sendJson(res, 401, "6402", "not logged in");
    return;
  }

  if (!parsedCookie["User-cookie"]) {
    console.log("no cookie ");
    sendJson(res, 401, "6402", "not logged in");
    return;
  }
  const tokenCookie: VerifyTokenCookie = JSON.parse(
    parsedCookie["User-cookie"]
  );

  if (!tokenCookie) {
    console.log("no cookie ");
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
