import { Router } from "express";
import { productRouter } from "../modules/product/product.route";
import { orderRouter } from "../modules/order/order.route";

const router = Router();

const moduleRoutes = [
  {  path: "/product",
     route: productRouter 
  },
  { 
    path: "/orders", 
    route: orderRouter 
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
