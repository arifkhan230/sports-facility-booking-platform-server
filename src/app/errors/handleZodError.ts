import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  const errMsg = err.issues.map((issue) => ` ${issue.message} `);

  return {
    statusCode,
    message: errMsg[0] || "Validation Error",
    errorSources,
  };
};

export default handleZodError;
