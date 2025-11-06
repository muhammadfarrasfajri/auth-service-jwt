import { router } from "../lib/router.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/ProductsController.js";

router.get("/", getProducts);
router.get("/:uuid", getProductById);
router.post("/", createProduct);
router.put("/:uuid", updateProduct);
router.delete("/:uuid", deleteProduct);

export default router;