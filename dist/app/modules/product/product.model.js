"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const inStockSchema = new mongoose_1.Schema({
    quantity: { type: Number, required: [true, "Quantity is required"] },
    status: { type: String, enum: ["Available", "stockOut"], default: "Available" },
}, { _id: false });
const productSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "Title is Required"] },
    category: { type: String, required: [true, "Category is Required"] },
    description: { type: String, required: [true, "Description is Required"] },
    image: { type: String, required: [true, "Image is Required"] },
    price: { type: Number, required: [true, "Price is Required"] },
    availability: inStockSchema,
    rating: { type: String, required: [true, "Rating is Required"] },
});
productSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield exports.Product.findOne({
            title: this.title,
            category: this.category,
            description: this.description
        });
        if (existingProduct) {
            throw new AppError_1.default(409, "Product already exists");
        }
        next();
    });
});
exports.Product = mongoose_1.default.model("Product", productSchema);
// productSchema.pre("save", async function (next) {
//   const existingProduct = await Product.findOne({
//     title: this.title,
//     category: this.category,
//     description: this.description,
//   });
//   if (existingProduct) {
//     throw new AppError(409, "Product already Exist");
//   }
//   next();
// });
// export const Product = mongoose.model<TProduct>("Product", productSchema);
