import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../database/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {

    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select('-password');
        return res.status(200).json({
            message: "Users fetched successfully.",
            data: filteredUsers
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong."
        });
    }
}

export const getMessages = async (req, res) => {

    try {
        const { recieverId } = req.params;
        const senderId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: senderId, recieverId: recieverId },
                { senderId: recieverId, recieverId: senderId }
            ]
        });

        return res.status(200).json({
            message: "Messages retrieved successfully.",
            data: messages
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong.",
            error
        });
    }
}

export const sendMessage = async (req, res) => {

    try {
        const { text, image } = req.body;
        const { recieverId } = req.params;
        const senderId = req.user._id;

        //Will work on the video and file uploading later.
        let imageURL;
        if (image) {
            const uploadCloudinaryResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadCloudinaryResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,
            recieverId,
            text,
            image: imageURL
        });

        // Implement socket.io for realtime sending
        const recieverSocketId = getRecieverSocketId(recieverId);
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json({
            message: "Message sent successfully.",
            data: newMessage
        });

    } catch (error) {
        return res.status(200).json({
            message: "Something went wrong.",
            error
        });
    }
}