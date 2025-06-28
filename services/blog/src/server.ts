import express from "express";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";
import cors from "cors";
import { createClient } from "redis";
dotenv.config();
const PORT = process.env.PORT || 7000;
const app = express();
app.use(cors());
app.use(express.json());
export const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.error("Redis connection error:", err);
  });
app.use("/api/v1", blogRoutes);
app.listen(PORT, () => {
  console.log(`blog service is running on port : ${PORT}`);
});
