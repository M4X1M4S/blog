import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import express from "express";
import connectToDatabase from "./utils/db.js";
const app = express();
// dotenv.config();
connectToDatabase();
const PORT = 5000;
app.use(express.json());
app.use("/api/v1", userRoutes);
app.get("/", (req, res) => {
    res.send("User service is running");
    console.log("jjsjsj");
});
app.listen(PORT, () => {
    console.log(`User service is running on port ${PORT}`);
});
