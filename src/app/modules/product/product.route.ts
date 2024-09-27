import { Router } from "express";
import { productController } from "./product.controller";
import { zodValidation } from "../../middleware/zodValidation";
import { productValidation } from "./product.validation";

const router = Router();

router.get("/", productController.getAllProduct);
router.get("/category", productController.getAllProduct);
router.get("/:id", productController.getSingleProduct);
router.post(
  "/",
  zodValidation(productValidation.productValidationSchema),
  productController.createSingleProduct
);


router.put(
  "/:id",
  zodValidation(productValidation.partialProductValidationSchema),
  productController.updateSingleProduct
);
router.delete("/:id", productController.deleteSingleProduct);

export const productRouter = router;
