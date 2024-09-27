import { z } from "zod";

export const orderZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be a string.",
    }),
    email: z
      .string({
        required_error: "Email is required.",
        invalid_type_error: "Email must be a string.",
      })
      .email("Email is not valid."),
    address: z.string({
      required_error: "Address is required.",
      invalid_type_error: "Address must be a string.",
    }),
    totalPrice: z
      .number({
        required_error: "Total price is required.",
        invalid_type_error: "Total price must be a number.",
      })
      .min(0, "Total price must be a positive number."),
    products: z.array(
      z.object({
        id: z.string(),
        quantity: z.number().int().min(1),
      }),
      {
        required_error: "Products are required.",
        invalid_type_error: "Products must be an array.",
      }
    ),
    orderMethods: z.enum(["COD", "Paid"], {
      required_error: "Order method is required.",
      invalid_type_error: "Order method must be an array of strings.",
    }),
  }),
});
