import { Types } from "mongoose";

export interface IOrder {
  name: string;
  email: string;
  address: string;
  totalPrice: number;

  products: { 
    id: Types.ObjectId; 
    quantity: number
    }[];
    orderMethods: "COD" | "Paid";
}
