import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";
const loginUser = async (req, res) => {
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
export default loginUser;
