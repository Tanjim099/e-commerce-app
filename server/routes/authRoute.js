import { Router } from "express";
import { register, login, loguot, sendOTP } from "../controllers/authController.js";

const userRouters = Router();

//register
userRouters.post("/otp", sendOTP);
userRouters.post("/register", register);
userRouters.post("/login", login);
userRouters.get("/logout", loguot);
export default userRouters;