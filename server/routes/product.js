import { Router } from "express";
import {
  getAllProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";

const router = Router();
router.get("/");
router.post("/");
router.put("/:id");
router.delete("/:id");

module.exports = router;
