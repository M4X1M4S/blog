import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";
export const loginUser = async (req, res) => {
    try {
        const { email, name, image } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email, image });
        }
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "2d",
        });
        res
            .status(200)
            .json({ message: "User logged in successfully", user, token });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const myProfile = async (req, res) => {
    const user = req.user;
    try {
        res.status(200).json({
            message: "User profile fetched successfully",
            user: user,
        });
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getUserProfile = async (req, res) => {
    const userId = req.params.id;
    try {
        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            message: "User profile fetched successfully",
            user: user,
        });
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const updateUser = async (req, res) => {
    const userId = req.user?._id;
    try {
        const { name, instagram, facebook, linkedin } = req.body;
        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }
        const user = await User.findByIdAndUpdate(userId, { name, instagram, facebook, linkedin }, { new: true });
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "2d",
        });
        res.status(200).json({
            message: "User updated successfully",
            user: user,
            token: token,
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
