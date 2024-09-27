"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const sendRespone_1 = __importDefault(require("../../utils/sendRespone"));
const product_service_1 = require("./product.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const getAllProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield product_service_1.productService.getAllProductFromDB(query);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        message: "All product is fetched successfully.",
        success: true,
        data: result,
    });
}));
const getAllCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.getAllCategoryFromDB();
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        message: "All Category is fetched successfully.",
        success: true,
        data: result,
    });
}));
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.getSingleProductFromDB(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        message: "Product is fetched successfully.",
        success: true,
        data: result,
    });
}));
const createSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.createSingleProductIntoDB(req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        message: "Product is created successfully.",
        success: true,
        data: result,
    });
}));
const updateSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.updateSingleProductFromDB(req.body, req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        message: "Selected Product is updated successfully.",
        success: true,
        data: result,
    });
}));
const deleteSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.deleteSingleProductFromDB(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        message: "Selected Product is deleted successfully.",
        success: true,
        data: result,
    });
}));
exports.productController = {
    createSingleProduct,
    getAllProduct,
    updateSingleProduct,
    deleteSingleProduct,
    getSingleProduct,
    getAllCategory,
};
