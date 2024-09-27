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
exports.orderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("../product/product.model");
const order_schema_1 = require("./order.schema");
const saveOrderIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        for (const item of data.products) {
            const orderedProductId = item.id;
            const orderedQuantity = item.quantity;
            const product = yield product_model_1.Product.findById(orderedProductId).session(session);
            if (!product) {
                throw new AppError_1.default(404, `Product with id ${orderedProductId} not found.`);
            }
            if (product.availability.quantity < orderedQuantity) {
                throw new AppError_1.default(400, `Not enough quantity available for product ${product.title}.`);
            }
            const newQuantity = product.availability.quantity - orderedQuantity;
            const newStatus = newQuantity === 0 ? "stockOut" : product.availability.status;
            yield product_model_1.Product.updateOne({ _id: orderedProductId }, { availability: { quantity: newQuantity, status: newStatus } }, { session });
        }
        // Create the order
        const createdOrder = yield order_schema_1.Order.create([data], { session });
        const result = createdOrder[0]; // Assuming single order creation
        // Commit transaction
        yield session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        // Rollback transaction on error
        yield session.abortTransaction();
        session.endSession();
        // Rethrow the error with status code 500
        throw new AppError_1.default(500, error || "Internal Server Error");
    }
});
const getAllOrderFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_schema_1.Order.find().populate("products.id");
    return result;
});
exports.orderService = {
    saveOrderIntoDB,
    getAllOrderFromDB,
};
