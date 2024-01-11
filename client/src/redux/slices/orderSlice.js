import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
    orderList: [],
    allOrders: []
};

export const makeOrders = createAsyncThunk("/order/make", async (datas) => {
    try {
        const response = axiosInstance.post("order/make/order", datas);
        return (await response).data;
    } catch (error) {
        console.log(error);
    }
});

export const getOrders = createAsyncThunk("/order/get", async (uid) => {
    try {
        const response = axiosInstance.get(`order/get/${uid}`);
        return (await response).data;
    } catch (error) {
        console.log(error);
    }
})

export const getAllOrder = createAsyncThunk("/order/get-all", async () => {
    try {
        const response = axiosInstance.get("order/get-all");
        return (await response).data;
    } catch (error) {
        console.log(error);
    }
})

export const orderStatus = createAsyncThunk("/order/status", async (data) => {
    try {
        const response = axiosInstance.put(`order/change/status/${data[0]}`, { status: data[1] });
        return (await response).data;
    } catch (error) {
        console.log(error);
    }
})

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                // console.log(action);
                state.orderList = action?.payload?.data;
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                // console.log(action)
                state.allOrders = action?.payload?.data;
            })
    }
});

export default orderSlice.reducer;