import { NextApiRequest, NextApiResponse } from "next";
import { registerUserType } from "../../apiutils/definitions";
import { registerUser } from "../db/db";
import sendJson from "../../apiutils/utils";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const param: registerUserType = req.body;

  if (
    !(
      param.email &&
      param.firstname &&
      param.lastname &&
      param.password &&
      param.username
    )
  ) {
    sendJson(res, 400, "6001", "madatory field(s) missing");
  } else {
    // const hashPassword = param.password; //await hash(param.password, 10);
    const hashPassword = await hash(param.password, 10);
    param.password = hashPassword;

    try {
      await registerUser(param);
      sendJson(res, 200, "6000", "User registered successfully");
    } catch (error) {
      sendJson(res, 500, "6007", "Something went wrong");
    }
    // await registerUser(param);
  }
}
