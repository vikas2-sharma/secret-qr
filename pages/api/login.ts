import { NextApiRequest, NextApiResponse } from "next";
import {
  HTTP_METHOD_NOT_ALLOWED,
  loginUserType,
  userVerifyResult,
} from "../../apiutils/definitions";
import { verifyUser } from "../db/db";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import sendJson, { userCookieField } from "../../apiutils/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("query method: ", req.method);

  // only post method is allowed
  if (req.method?.toLowerCase() !== "post") {
    res.statusCode == 405;
    res.json({ code: "405", message: "this method not allowed" });
    return;
  }

  let param: loginUserType;
  param = req.body;

  // check all mandatory parameters are in body
  if (!param.username) sendJson(res, 400, "6001", "Username is mandatory");
  if (!param.password) sendJson(res, 400, "6002", "Password is mandatory");
  try {
    const result = await verifyUser(param);
    if (result && result.status == "fail") {
      sendJson(
        res,
        HTTP_METHOD_NOT_ALLOWED,
        "6003",
        result.message ? result.message : "Something went wrong"
      );
    } else {
      // const cookieStore = cookies();
      // cookieStore.set("token", result.token || "");
      res.setHeader(
        "Set-Cookie",
        serialize(
          userCookieField,
          JSON.stringify({ user: param.username, token: result.token }),
          {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            path: "/",
          }
        )
      );
      sendJson(res, 200, "6000", "Login Success");
    }
  } catch (error) {
    sendJson(res, 401, "6004", `Something went wrong ${error}`);
  }
}
