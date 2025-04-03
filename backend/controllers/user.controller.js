import bcrypt from 'bcrypt';

import User from "../models/user.model.js";
import cloudinary from '../database/cloudinary.js';
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be atleast 6 characters."
        });
    }

    try {
        const findUserIfExists = await User.findOne({ email }).select("-password");
        if (findUserIfExists) {
            return res.status(400).json({
                message: "User already exists. Please sign in."
            });
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hashedPassword) => {
                const createUser = await User.create({
                    name,
                    email,
                    password: hashedPassword,
                });

                let token = generateToken(createUser._id, res);
                await createUser.save();

                if (createUser) {
                    return res.status(201).json({
                        message: "User created successfully.",
                        data: createUser,
                        cookie: token,
                        success: true
                    });
                } else {
                    return res.status(500).json({
                        message: `There was an error in creating the user.\t\t${err.message}`
                    });
                }
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error.`
        });
    }
}

export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    try {
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(404).json({
                message: "Invalid email or password."
            });
        }

        bcrypt.compare(password, findUser.password, (err, result) => {
            if (result) {

                let token = generateToken(findUser._id, res);

                return res.status(200).json({
                    message: "User signed in successfully.",
                    data: findUser,
                    cookie: token,
                    success: true
                });
            } else {
                return res.status(401).json({
                    message: "Invalid email or password."
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error."
        });
    }

}

export const logoutUser = async (req, res) => {
    if (!req.cookies.token) {
        return res.status(400).json({
            message: "User already logged out.",
            success: false
        });
    }

    res.cookie('token', '', { maxAge: 0 });
    return res.status(200).json({
        message: "User logged out successfully.",
        success: true
    });
}

export const getUserDetails = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong."
        })
    }
}

export const updateUserProfile = async (req, res) => {

    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({
                message: "Profile Picture is required."
            });
        }

        const uploadPicResponse = await cloudinary.uploader.upload(profilePic);

        const user = await User.findByIdAndUpdate(userId, {
            profilePic: uploadPicResponse.secure_url
        }, { new: true });

        res.status(200).json({
            message: "Profile Picture updated successfully.",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong."
        });
    }
}