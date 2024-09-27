import { Response } from "express";

type TData<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TData<T>) => {
  res.status(data.statusCode).send({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
