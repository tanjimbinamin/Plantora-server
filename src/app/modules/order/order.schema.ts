import mongoose, { Types } from "mongoose";
import { IOrder } from "./order.interface";

export const orderSchema = new mongoose.Schema<IOrder>({
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
        id: { type: Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    required: [true, "Products are required."],
    validate: {
      validator: function (v: { id: Types.ObjectId; quantity: number }[]) {
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
export const Order = mongoose.model<IOrder>("Order", orderSchema);
