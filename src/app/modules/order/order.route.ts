import { Router } from "express";
import { orderController } from "./order.controller";
import { zodValidation } from "../../middleware/zodValidation";
import { orderZodSchema } from "./order.validation";

const router = Router();

router.post(
  "/create-order",
  zodValidation(orderZodSchema),
  orderController.saveOrder
);
router.get("/allOrders", orderController.getAllOrder);

export const orderRouter = router;
