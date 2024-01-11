const { Router } = require("express");
const { createProduct, getAllProduct, getProduct } = require("../controllers/productController");

const productRoutes = Router();

//create
productRoutes.post("/create", createProduct);
productRoutes.get("/get-all", getAllProduct);
productRoutes.get("/get/:pid", getProduct);

module.exports = { productRoutes }