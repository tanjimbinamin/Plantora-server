/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { genericErrorReturn, IErrorSource } from "./error.inteface";

//validation error
export const handleMongooseError = (
  err: mongoose.Error.ValidationError
): genericErrorReturn => {
  const errorSource: IErrorSource[] = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: "Mongoose Error",
    errorSource,
  };
};

//cast error

export const handleMongooseCastError = (
  err: mongoose.Error.CastError
): genericErrorReturn => {
  const errorSource: IErrorSource[] = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Mongoose Error",
    errorSource,
  };
};

//duplicate error
export const handleMongooseDuplicateError = (err: any): genericErrorReturn => {
  const match =
    err.message.match(/"([^"]*)"/) ||
    err.erroData.errorResponse.errmsg.match(/"([^"]*)"/);
  const message = match && match[1];
  const errorSource: IErrorSource[] = [
    {
      path: "",
      message: `${message} is duplicated`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Mongoose duplicate Error",
    errorSource,
  };
};
