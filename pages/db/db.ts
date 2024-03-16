import { db, sql } from "@vercel/postgres";
import {
  TABLE_NAME,
  loginResponsType,
  loginUserType,
  registerUserType,
  userVerifyResult,
} from "../definitions";
// import { compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

export async function registerUser(param: registerUserType) {
  const client = await db.connect();
  console.log(param);
  try {
    return await client.sql`
    INSERT INTO qrusers (username, firstname, lastname, password, email)
    VALUES (${param.username}, ${param.firstname}, ${param.lastname}, ${param.password}, ${param.email});`;

    // client.prependListener()
  } catch (e) {
    console.log("error storing data", e);
  }
}

export async function verifyUser(
  param: loginUserType
): Promise<userVerifyResult> {
  try {
    const result =
      await sql<loginResponsType>`SELECT password from qrusers WHERE username = ${param.username}`;

    // console.log(result.rowCount);
    if (result.rowCount > 0) {
      const dbPassword = result.rows.at(0)?.password || "";
      if (dbPassword.length > 0) {
        const passwordResult = dbPassword; //wait compare(param.password, dbPassword);
        if (passwordResult) {
          const token = sign(
            { username: param.username },
            process.env.JSON_TOKEN_SERCRET || "",
            { expiresIn: "1h" }
          );
          console.log({ token });

          const jwt = verify(token, process.env.JSON_TOKEN_SERCRET || "");
          console.log({ jwt });
          return { status: "success", message: "login success", token };
        } else return { status: "fail", message: "Password not matched" };
      } else {
        return { status: "fail", message: "Password not matched" };
      }
    } else {
      return { status: "fail", message: "User not found " };
    }
  } catch (error) {
    return { status: "fail", message: `Something went wrong ${error}` };
  }
}
