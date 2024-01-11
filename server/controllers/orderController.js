
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/apiError");
const { orderModel } = require("../models/orderModel")

const makeOrders = async (req, res, next) => {
    try {
        const { items, userId } = req.body;
        const order = await orderModel.create({
            products: items,
            buyer: userId
        });

        await order.save()

        res.status(201).json(
            new ApiResponse(200, "Order make Successfully", order)
        )
    } catch (error) {
        console.log(error);
        next(new ApiError(500, "Failed to order", error))
    }
};

const getOrder = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const orders = await orderModel.find({ buyer: uid }).populate("products").populate("buyer", "name");
        res.status(201).json(
            new ApiResponse(200, "Orders got Successfully", orders)
        )
    } catch (error) {
        console.log(error);
        next(new ApiError(500, "Failed to get Order", error))
    }
}

const getAllOrder = async (req, res, next) => {
    try {
        const orders = await orderModel.find().populate("products").populate("buyer").sort({ createdAt: -1 })
        res.status(201).json(
            new ApiResponse(200, "Orders Fetched Successfully", orders)
        )
    } catch (error) {
        console.log(error);
        next(new ApiError(500, "Failed to Fetched Order", error))
    }
}

const orderStatus = async (req, res, next) => {
    try {
        const { orderid } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderid, { status }, { new: true });
        res.status(201).json(
            new ApiResponse(200, "Orders status changed Successfully", orders)
        )
    } catch (error) {
        console.log(error);
        next(new ApiError(500, "Failed to Order Status", error))
    }
}

module.exports = { makeOrders, getOrder, getAllOrder, orderStatus };