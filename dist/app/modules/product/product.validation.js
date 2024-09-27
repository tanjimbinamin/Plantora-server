"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const productValidationSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is Required",
            invalid_type_error: "Title must be string",
        }),
        category: zod_1.z.string({
            required_error: "Category is Required",
            invalid_type_error: "Category must be string",
        }),
        price: zod_1.z.number({
            required_error: "Price is Required",
            invalid_type_error: "Price must be number",
        }),
        description: zod_1.z.string({
            required_error: "Description is Required",
            invalid_type_error: "Description must be string",
        }),
        image: zod_1.z.string({
            required_error: "Image is Required",
            invalid_type_error: "Image must be string",
        }),
        availability: zod_1.z.object({
            quantity: zod_1.z.number({
                required_error: "Quantity is Required",
                invalid_type_error: "Quantity must be number",
            }),
            status: zod_1.z
                .enum(["Available", "stockOut"], {
                required_error: "Available is Required",
                invalid_type_error: "Available must be string",
            })
                .optional(),
        }),
        rating: zod_1.z.string({
            required_error: "Rating is Required",
            invalid_type_error: "Rating must be string",
        }),
    }),
})
    .strict();
const partialProductValidationSchema = zod_1.z.object({
    body: productValidationSchema.shape.body.partial(),
});
exports.productValidation = {
    productValidationSchema,
    partialProductValidationSchema,
};
