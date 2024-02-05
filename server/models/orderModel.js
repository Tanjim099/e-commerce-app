import { Schema, mongoose } from "mongoose";

const orderSchema = new Schema({
    products: [
        {
            id: {
                type: mongoose.Types.ObjectId,
                ref: "Products"
            },
            name: String,
            price: Number,
            image: String,
            itemQuantity: Number
        }
    ],
    payment: {},
    buyer: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shopped", "Delivered", "Cancel"]
    }
}, {
    timestamps: true
});

const orderModel = mongoose.model("Orders", orderSchema);

export default orderModel;