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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.orderSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.orderSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        match: [/\S+@\S+\.\S+/, "Email is not valid."],
    },
    address: {
        type: String,
        required: [true, "Address is required."],
    },
    totalPrice: {
        type: Number,
        required: [true, "Total price is required."],
        min: [0, "Total price must be a positive number."],
    },
    products: {
        type: [
            {
                id: { type: mongoose_1.Types.ObjectId, ref: "Product" },
                quantity: { type: Number, default: 1 },
            },
        ],
        required: [true, "Products are required."],
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: "There must be at least one product.",
        },
        _id: false,
    },
    orderMethods: {
        type: String,
        enum: ["COD", "Paid"], // Restrict to only "COD" or "Paid"
        required: [true, "Order Method is required."],
        default: "COD", // Default value if not provided
    },
});
exports.Order = mongoose_1.default.model("Order", exports.orderSchema);
