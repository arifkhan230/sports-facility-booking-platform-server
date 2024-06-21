import { TErrorSources, TGenericErrorResponse } from "../interface/error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: "",
      message: err?.errorResponse?.errmsg,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: err?.errorResponse?.errmsg,
    errorSources,
  };
};

export default handleDuplicateError;
