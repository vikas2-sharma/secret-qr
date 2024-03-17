import { db, sql } from "@vercel/postgres";
import { headers } from "next/headers";

type sqlType = {
  month: string;
};

export type userDataType = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  keys: any;
};
export async function getTableList() {
  const tables = await sql<sqlType>`SELECT month FROM revenue`;
  return tables;
}

export async function getUsers() {
  try {
    const table =
      await sql<userDataType>`SELECT first_name, last_name, username, email, keys FROM qr_users`;
    return table;
  } catch (error) {
    "something went wrong" + error;
    throw error;
  }
  // console.log(table);
  // return table;
}

export async function getVerified() {
  const headerCookie = headers();
  console.log({ headerCookie });
}
