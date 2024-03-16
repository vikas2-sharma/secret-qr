export type registerUserType = {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
};

export type loginUserType = {
  username: string;
  password: string;
};

export type loginResponsType = {
  password: string;
};

export type userVerifyResult = {
  status: "success" | "fail";
  message: string | undefined;
  token?: string;
};
export const TABLE_NAME = "qrusers";

export default function definitions() {
  return null;
}
