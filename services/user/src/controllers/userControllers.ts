import { Request, Response } from "express";
import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";
import { authenticatedRequest } from "../middlewares/isAuth.js";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, name, image } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, image });
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
      expiresIn: "2d",
    });
    res
      .status(200)
      .json({ message: "User logged in successfully", user, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const myProfile = async (req: authenticatedRequest, res: Response) => {
  const user = req.user;
  try {
    res.status(200).json({
      message: "User profile fetched successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
