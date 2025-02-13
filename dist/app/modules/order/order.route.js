"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const zodValidation_1 = require("../../middleware/zodValidation");
const order_validation_1 = require("./order.validation");
const router = (0, express_1.Router)();
router.post("/create-order", (0, zodValidation_1.zodValidation)(order_validation_1.orderZodSchema), order_controller_1.orderController.saveOrder);
router.get("/allOrders", order_controller_1.orderController.getAllOrder);
exports.orderRouter = router;
