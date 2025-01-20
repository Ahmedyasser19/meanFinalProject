import { Router } from "express";
import {
  getAllProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";

import authenticateToken from "../middleware/isAuthenticated.js";
import uploadImage from "../middleware/upload.js";

const router = Router();
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", authenticateToken, uploadImage, addNewProduct);
router.put("/:id", authenticateToken, uploadImage, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);

export default router;
