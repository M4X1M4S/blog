import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 7000;
const app = express();
app.listen(PORT, () => {
  console.log(`blog service is running on port : ${PORT}`);
});
