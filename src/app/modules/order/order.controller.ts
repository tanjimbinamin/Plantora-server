/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRespone";
import { orderService } from "./order.service";

const saveOrder: RequestHandler = catchAsync(async (req, res, next) => {
  const data = req.body;

  const result = await orderService.saveOrderIntoDB(data);

  sendResponse(res, {
    statusCode: 200,
    message: "Order is created successfully.",
    success: true,
    data: result,
  });
});

const getAllOrder: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await orderService.getAllOrderFromDB();

  sendResponse(res, {
    statusCode: 200,
    message: "All Order is fetched successfully.",
    success: true,
    data: result,
  });
});

export const orderController = {
  saveOrder,
  getAllOrder,
};
