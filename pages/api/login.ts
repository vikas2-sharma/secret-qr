import { compare, hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { loginUserType } from "../definitions";
import { verifyUser } from "../db/db";

const hashedPassword =
  "$2b$10$eXr4PQDeOpvD.TX55ocbYuV9cydrBWs.nQNR/GQZgIMcL6l/SoVAW";
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

  //   console.log(req.body);
  let param: loginUserType;
  param = req.body;

  // check all mandatory parameters are in body
  if (!param.username) sendJson(res, 400, "6001", "Username is mandatory");
  if (!param.password) sendJson(res, 400, "6002", "Password is mandatory");

  //   bcrypt.hash(param.password, 10, function (err: any, result: any) {
  //     console.log("error", err);
  //     console.log("result", result);
  //   });

  // hash(param.username, 10)
  //   .then((value) => {
  //     console.log("hash value", value);
  //   })
  //   .catch((err) => {
  //     console.log("hash error", err);
  //   });

  //$2b$10$YaABQ/cFQnnuYzjFwhONMugwADLP0WxIaTA5SFOSPLV/NxXJS0Pbm
  //$2b$10$eXr4PQDeOpvD.TX55ocbYuV9cydrBWs.nQNR/GQZgIMcL6l/SoVAW
  let passwordResult: boolean = false;

  let result = await verifyUser(param);
  // try {
  //   passwordResult = await compare(param.password, hashedPassword);
  // } catch (e) {
  //   //send something went wrong
  //   sendJson(res, 500, "7001", "Somthing went wrong");
  // }

  if (result.status == "fail") {
    sendJson(
      res,
      401,
      "6003",
      result.message ? result.message : "Something went wrong"
    );
  } else {
    sendJson(res, 200, "6000", "Login Success");
  }

  // compare(param.password, hashedPassword, function (err: any, result: any) {
  //   console.log("error compare", err);
  //   console.log("result compare", result);
  //   //check password authentic
  // });
}

function sendJson(
  res: NextApiResponse,
  httpCode: number,
  responseCode: String,
  responseMessage: String
) {
  res.statusCode = httpCode;
  res.json({ code: responseCode, message: responseMessage });
}
