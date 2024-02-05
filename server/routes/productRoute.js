import { Router } from "express";
import { createProduct, getAllProduct, getProduct } from "../controllers/productController.js";

const productRoutes = Router();

//create
productRoutes.post("/create", createProduct);
productRoutes.get("/get-all", getAllProduct);
productRoutes.get("/get/:pid", getProduct);

export default productRoutes