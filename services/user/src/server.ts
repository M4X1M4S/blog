import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import express, { Request, Response } from "express";
import connectToDatabase from "./utils/db.js";
const app = express();
dotenv.config();
connectToDatabase();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/v1", userRoutes);
app.get("/", (req: Request, res: Response) => {
  console.log("API is running");
  res.send("API is running");
});
app.listen(PORT, () => {
  console.log(`User service is running on port ${PORT}`);
});
