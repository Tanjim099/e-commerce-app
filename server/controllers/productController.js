import productModel from "../models/productModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/apiError.js";

export const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, image } = req.body;
        if (!name || !description || !price || !category || !image) {
            return next(new ApiError(400, "All fields are requred"))
        }
        const product = await productModel.create({
            name,
            description,
            price,
            category,
            image
        });

        await product.save()

        res.status(201).json(
            new ApiResponse(200, "Product create Successully", product)
        )
    } catch (error) {
        console.log(error)
        next(new ApiError(500, "Failed to create product", error))
    }
}

export const getProduct = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await productModel.findById(pid)
        res.status(201).json(
            new ApiResponse(200, "Product Fetched Successfully", product)
        )
    } catch (error) {
        console.log(error)
        next(new ApiError(500, "Failed to Fetched product", error))
    }
}
export const getAllProduct = async (req, res, next) => {
    try {
        const products = await productModel.find().sort({ createdAt: -1 });
        res.status(201).json(
            new ApiResponse(200, "All Product Fetched Successfully", products)
        )
    } catch (error) {
        console.log(error)
        next(new ApiError(500, "Failed to Fetched all products", error))
    }
}