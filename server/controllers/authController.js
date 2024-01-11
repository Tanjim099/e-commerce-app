const { hashPassword, comparePassword } = require("../helper/authHelper");
const { authModel } = require("../models/authModel");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/apiError");


const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    httpOnly: true
}
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // console.log(name, email, password)
        if (!name || !email || !password) {
            return next(new ApiError(400, "All fileds are required"))
        }

        //already exist
        const userExist = await authModel.findOne({ email });
        if (userExist) {
            return next(new ApiError(400, "Email already exist"))
        }
        const hashedPassword = await hashPassword(password)
        const user = await authModel.create({
            name,
            email,
            password: hashedPassword,
        })

        await user.save();

        const token = await user.generateJWTToken();
        // console.log("register token", token)
        res.cookie("token", token, cookieOptions);
        user.password = undefined;
        res.status(201).json(
            new ApiResponse(200, "User Register Successfully", user)
        )
    } catch (error) {
        console.log(error);
        next(new ApiError(501, "Failed to register"))
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ApiError(400, "All fields are required"))
        }
        const user = await authModel.findOne({ email });
        if (!user) {
            return next(new ApiError(401, "Email not registerd"))
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return next(new ApiError(401, "Invalid Password"))
        }
        const token = await user.generateJWTToken();
        // console.log("login token", token)
        user.password = undefined;
        const ars = res.cookie("token", token, cookieOptions);
        console.log(ars)

        res.status(201).json(
            new ApiResponse(200, "Login Successfully", user)
        )
    } catch (error) {
        console.log(error);
        next(new ApiError(501, "Failed to login"))
    }
}

const loguot = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            secure: true,
            maxAge: 0,
        })

        res.status(201).json(
            new ApiResponse(200, "Loguot Successfully")
        )
    } catch (error) {
        console.log(error);
        next(new ApiError(501, "Failed to logout"))
    }
}
module.exports = { register, login, loguot }