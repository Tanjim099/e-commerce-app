import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
    productList: [],
};

export const getAllProduct = createAsyncThunk("/get-all", async () => {
    try {
        const response = axiosInstance.get("product/get-all");
        return (await response).data
    } catch (error) {
        console.log(error)
    }
})

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.productList = action?.payload.data
        })
    }
});

export default productSlice.reducer;