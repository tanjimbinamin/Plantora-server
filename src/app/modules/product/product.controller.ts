import { RequestHandler } from "express";
import sendResponse from "../../utils/sendRespone";
import { productService } from "./product.service";
import catchAsync from "../../utils/catchAsync";

const getAllProduct: RequestHandler = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await productService.getAllProductFromDB(query);
  sendResponse(res, {
    statusCode: 200,
    message: "All product is fetched successfully.",
    success: true,
    data: result,
  });
});
const getAllCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await productService.getAllCategoryFromDB();

  sendResponse(res, {
    statusCode: 200,
    message: "All Category is fetched successfully.",
    success: true,
    data: result,
  });
});

const getSingleProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await productService.getSingleProductFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    message: "Product is fetched successfully.",
    success: true,
    data: result,
  });
});

const createSingleProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await productService.createSingleProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    message: "Product is created successfully.",
    success: true,
    data: result,
  });
});

const updateSingleProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await productService.updateSingleProductFromDB(
    req.body,
    req.params.id
  );

  sendResponse(res, {
    statusCode: 200,
    message: "Selected Product is updated successfully.",
    success: true,
    data: result,
  });
});

const deleteSingleProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await productService.deleteSingleProductFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    message: "Selected Product is deleted successfully.",
    success: true,
    data: result,
  });
});

export const productController = {
  createSingleProduct,
  getAllProduct,
  updateSingleProduct,
  deleteSingleProduct,
  getSingleProduct,
  getAllCategory,
};
