/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from "express";
import { config } from "../config";
import { ZodError } from "zod";
import { IErrorSource } from "../errors/error.inteface";
import { handleZodError } from "../errors/handleZodError";
import AppError from "../errors/AppError";
import {
  handleMongooseCastError,
  handleMongooseDuplicateError,
  handleMongooseError,
} from "../errors/handleMongooseError";

export const globalsErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode: number = 500;
  let message: string = "Something went wrong";
  let errorSource: IErrorSource[] = [
    {
      path: "",
      message: "something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const zodError = handleZodError(err);
    statusCode = zodError.statusCode;
    message = zodError.message;
    errorSource = zodError.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSource = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSource = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleMongooseError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleMongooseCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (err?.code === 11000 || err?.erroData?.code === 11000) {
    const simplifiedError = handleMongooseDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }

  return res.status(statusCode).send({
    success: false,
    message: message,
    errorSource,
    stack: config.node_env == "development" ? err?.stack : null,
  });
};
