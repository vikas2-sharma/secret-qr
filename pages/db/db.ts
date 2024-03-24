import { db, sql } from "@vercel/postgres";
import {
  AUTH_TAG_LEGTH,
  ENCRYPT_ALGO,
  EncryptedData,
  SaveQRResponseModel,
  TABLE_NAME,
  loginResponsType,
  loginUserType,
  registerUserType,
  userVerifyResult,
} from "../definitions";
// import { compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { compare } from "bcrypt";
import {
  createCipheriv,
  createDecipheriv,
  generateKey,
  publicEncrypt,
  randomBytes,
  randomFill,
  randomInt,
  randomUUID,
} from "crypto";

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
        // const passwordResult = dbPassword; //wait compare(param.password, dbPassword);
        const passwordResult = await compare(param.password, dbPassword);
        if (passwordResult) {
          const token = sign(
            { username: param.username },
            process.env.JSON_TOKEN_SERCRET || "",
            { expiresIn: "2h" }
          );
          // console.log({ token });

          // const jwt = verify(token, process.env.JSON_TOKEN_SERCRET || "");
          // console.log({ jwt });
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

export default function getDB() {
  return db;
}

export async function saveQRData(
  rawData: string,
  user: string
): Promise<SaveQRResponseModel> {
  const client = await db.connect();
  // console.log({ rawData, user });
  try {
    const accessUsers: string[] = [user];
    const query = `
    INSERT INTO qrcodes (createdby, qrdata, decryptionkey, accessuser, iv, authTag) 
    VALUES ($1, $2, $3, $4, $5, $6)`;

    const key = await generatKeyLocal();
    const iv = generateIV();

    // console.log({ iv });

    const encryptedData = encryptText(rawData, key, iv);

    // decryptText(encryptedData.encryptValue, key, iv, encryptedData.authTag);

    const result = await client.query(query, [
      user,
      encryptedData.encryptValue,
      key,
      accessUsers,
      iv,
      encryptedData.authTag,
    ]);
    // console.log("insert result: " + !!result);
    if (!!result) {
      return { encryptedValue: encryptedData.encryptValue, result: "success" };
    } else {
      return {
        encryptedValue: "",
        result: "success",
        errorMessage: "something went wrong",
      };
    }
  } catch (e: any) {
    // console.log("error storing data", e);
    return {
      encryptedValue: "",
      result: "success",
      errorMessage: e,
    };
  }
}

function encryptText(data: string, key: string, iv: string): EncryptedData {
  // console.log("encryptText");
  // console.log({ data, key, iv });

  const cipher = createCipheriv(
    ENCRYPT_ALGO,
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex"),
    {
      authTagLength: AUTH_TAG_LEGTH,
    }
  );
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  // console.log({ encrypted });
  // console.log({ authTag });
  // console.log({ authTagLength: authTag.length });
  console;
  return { encryptValue: encrypted, authTag: authTag };
  // createCi;
}

function decryptText(
  encText: string,
  key: string,
  iv: string,
  authTag: string
): string | void {
  // console.log("decryptText");
  // console.log({ encText, key, iv });

  try {
    const deCipher = createDecipheriv(
      ENCRYPT_ALGO,
      Buffer.from(key, "hex"),
      Buffer.from(iv, "hex"),
      {
        authTagLength: AUTH_TAG_LEGTH,
      }
    );

    deCipher.setAuthTag(Buffer.from(authTag, "hex"));

    let decrypted = deCipher.update(Buffer.from(encText, "hex"));

    // Finalize the deCipher
    decrypted = Buffer.concat([decrypted, deCipher.final()]);
    // console.log({ decrypted: decrypted.toString("utf8") });
    return decrypted.toString("hex"); // Return the decrypted data as a string
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("error");
    return; // Return undefined or handle the error as needed
  }
}

export function generatKeyLocal() {
  return new Promise<string>((resolve, reject) => {
    const key = generateKey("aes", { length: 128 }, (error, key) => {
      if (error) {
        reject(error);
      }

      const hexKey = key.export().toString("hex");
      // console.log(hexKey);
      // console.log("hexKey length: ", hexKey.length);
      resolve(hexKey);
    });
    // console.log({ key });
  });
}

export function generateIV() {
  const random = randomBytes(8);
  const iv = random.toString("hex");
  // console.log("iv length: ", iv.length);
  return iv;
}
