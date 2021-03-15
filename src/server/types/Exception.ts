import { ErrorObject } from "ajv";

export type ExceptionProps = {
  code?: number | string;
  errorInfo?: any; // firebase-functions.HttpsError
  errors?: ErrorObject[] | unknown[] | null;
  expose?: boolean;
  message?: string;
  status?: "ok" | "error";
};
