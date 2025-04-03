import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "../config/env.js";
import User from "../models/user.model.js";

export const isAuthorized = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized Access."
            });
        }

        let decode = jwt.verify(token, JWT_TOKEN);
        if (!decode) {
            return res.status(401).json({
                message: "Unauthorized Access."
            });
        }
        const findUser = await User.findById(decode.id).select('-password');
        if (!findUser) {
            return res.status(404).json({
                message: "User not found."
            });
        }
        req.user = findUser;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong.",
            error
        });
    }
}