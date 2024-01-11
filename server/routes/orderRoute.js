const { Router } = require("express");
const { makeOrders, getOrder, orderStatus, getAllOrder } = require("../controllers/orderController");
const orderRoutes = Router();

orderRoutes.post("/make/order", makeOrders);
orderRoutes.get("/get/:uid", getOrder);
orderRoutes.get("/get-all", getAllOrder);
orderRoutes.put("/change/status/:orderid", orderStatus);

module.exports = { orderRoutes };
