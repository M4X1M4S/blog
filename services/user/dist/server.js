import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import userRoutes from "./routes/userRoutes.js";
import express from "express";
import connectToDatabase from "./utils/db.js";
import cors from "cors";
const app = express();
app.use(cors());
dotenv.config();
connectToDatabase();
const PORT = 5000;
app.use(express.json());
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET, // Click 'View API Keys' above to copy your API secret
});
app.use("/api/v1", userRoutes);
app.get("/", (req, res) => {
    res.send("User service is running");
});
app.listen(PORT, () => {
    console.log(`User service is running on port ${PORT}`);
});
