import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_TOKEN, NODE_ENV } from '../config/env.js';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ id: userId }, JWT_TOKEN, { expiresIn: JWT_EXPIRES_IN });

    res.cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: NODE_ENV === "production" || false
    });

    return token;
}