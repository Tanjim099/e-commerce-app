import { hashPassword, comparePassword } from "../helper/authHelper.js"
import authModel from "../models/authModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/apiError.js";
import otpGenerator from 'otp-generator';
import OTP from "../models/optModel.js";
const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    httpOnly: true
}

export const sendOTP = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log("email", email);
        if (!email) {
            return next(new ApiError(403, "Email is required"));
        }
        const userExist = await authModel.findOne({ email });
        if (userExist) {
            return next(new ApiError(400, "Email already exist"))
        }

        var opt = otpGenerator.generate(6, {
            uperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const result = await OTP.findOne({ opt: opt });
        while (result) {
            opt = optGenerator.generate(6, {
                uperCaseAlphabets: false,
            });
        }

        const optPayload = { email, opt };
        const optBody = await OTP.create(optPayload);

        return res.status(201).json(
            new ApiResponse(200, optBody, "OTP Send Successfully...")
        )
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message))
    }
}

export const register = async (req, res, next) => {
    try {
        console.log(req.body);
        const { name, email, password, otp } = req.body;
        // console.log(name, email, password)
        console.log(typeof otp);
        if (!name || !email || !password || !otp) {
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

export const login = async (req, res, next) => {
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

export const loguot = async (req, res, next) => {
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