import { Request, Response } from "express";
import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";

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
