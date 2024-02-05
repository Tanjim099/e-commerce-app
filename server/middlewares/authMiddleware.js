import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
export const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;
    console.log("middleware token", token)
    if (!token) {
        return next(new ApiError(400, "Unauthenticated, please login"));
    }

    const tokenDetails = jwt.verify(token, process.env.JWT_SECERET);
    console.log(tokenDetails);
    if (!tokenDetails) {
        return next(new ApiError(400, "unauthenticated, please login"))
    }

    req.user = tokenDetails;
    next();
}

//middleware for protecting routes
export function authenticateToken(req, res, next) {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, seceretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403) //forbidden
            }
            req.user = user;
            next()
        })
    }
    else {
        res.sendStatus(401) //unauthorized
    }
}