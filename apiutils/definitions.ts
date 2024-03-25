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

export interface VerifyTokenCookie {
  user?: string;
  token?: string;
}

export const ENCRYPT_ALGO = "aes-128-ccm";
export const AUTH_TAG_LEGTH = 16;

export interface EncryptedData {
  encryptValue: string;
  authTag: string;
}
export interface SaveQRResponseModel {
  encryptedValue: string;
  result: "success" | "failed";
  errorMessage?: string;
}

export interface ApiResponse {
  readonly code: string;
  readonly message: string;
  // token?: string;
}

export interface LoginReponse extends ApiResponse {
  readonly token?: string;
}
