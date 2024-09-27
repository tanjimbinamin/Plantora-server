import { ZodError, ZodIssue } from "zod";

import { genericErrorReturn, IErrorSource } from "./error.inteface";

export const handleZodError = (err: ZodError): genericErrorReturn => {
  const errorSource: IErrorSource[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1] as string,
      message: issue.message,
    };
  });
  return {
    statusCode: 400,
    message: "Zod Validation Error",
    errorSource: errorSource,
  };
};
