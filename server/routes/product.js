import { Router } from "express";
import {
  getAllProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";

import authenticateToken from "../middleware/isAuthenticated.js";

const router = Router();
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", authenticateToken, addNewProduct);
router.put("/:id", authenticateToken, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);

export default router;
