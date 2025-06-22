import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import express from "express";
import connectToDatabase from "./utils/db.js";
const app = express();
dotenv.config();
connectToDatabase();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`User service is running on port ${PORT}`);
});
