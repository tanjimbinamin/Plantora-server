"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderZodSchema = void 0;
const zod_1 = require("zod");
exports.orderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required.",
            invalid_type_error: "Name must be a string.",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required.",
            invalid_type_error: "Email must be a string.",
        })
            .email("Email is not valid."),
        address: zod_1.z.string({
            required_error: "Address is required.",
            invalid_type_error: "Address must be a string.",
        }),
        totalPrice: zod_1.z
            .number({
            required_error: "Total price is required.",
            invalid_type_error: "Total price must be a number.",
        })
            .min(0, "Total price must be a positive number."),
        products: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string(),
            quantity: zod_1.z.number().int().min(1),
        }), {
            required_error: "Products are required.",
            invalid_type_error: "Products must be an array.",
        }),
        orderMethods: zod_1.z.enum(["COD", "Paid"], {
            required_error: "Order method is required.",
            invalid_type_error: "Order method must be an array of strings.",
        }),
    }),
});
