import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helper/axiosInstance"

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : "",
    data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null,
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    signData: null,
    userData: [],
}

export const register = createAsyncThunk("/auth/register", async (data) => {
    try {
        const response = axiosInstance.post("user/register", data);
        return (await response).data;
    } catch (error) {
        console.log(error)
    }
})

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const response = axiosInstance.post("user/login", data);
        return (await response).data;
    } catch (error) {
        console.log(error)
    }
})

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const response = axiosInstance.get("user/logout");
        return (await response).data
    } catch (error) {
        console.log(error);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            console.log(action);
        })
            .addCase(login.fulfilled, (state, action) => {
                console.log(action?.payload?.data)
                state.data = action?.payload?.data;
                state.role = action?.payload?.data?.role;
                state.isLoggedIn = true;
                localStorage.setItem("data", JSON.stringify(action?.payload?.data));
                localStorage.setItem("isLoggedIn", JSON.stringify(true));
                localStorage.setItem("role", JSON.stringify(action?.payload?.data?.role));
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                localStorage.removeItem("data");
                localStorage.removeItem("isLoggedIn")
                localStorage.removeItem("role");
            })
    }
})

export default authSlice.reducer;