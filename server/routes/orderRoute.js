import { Router } from "express";
import { makeOrders, getOrder, orderStatus, getAllOrder } from "../controllers/orderController.js";
const orderRoutes = Router();

orderRoutes.post("/make/order", makeOrders);
orderRoutes.get("/get/:uid", getOrder);
orderRoutes.get("/get-all", getAllOrder);
orderRoutes.put("/change/status/:orderid", orderStatus);

export default orderRoutes;
