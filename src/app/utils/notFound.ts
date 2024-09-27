import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  return res.status(404).send({
    success: false,
    statusCode: 404,
    message: "Requested URL not found",
  });
};
