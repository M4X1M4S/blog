import express from "express";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 7000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", blogRoutes);
app.listen(PORT, () => {
  console.log(`blog service is running on port : ${PORT}`);
});
