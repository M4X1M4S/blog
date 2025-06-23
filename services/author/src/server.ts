import express from "express";
import dotenv from "dotenv";
import { sql } from "./utils/db.js";
import authorRouter from "./routes/authorRoutes.js";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET, // Click 'View API Keys' above to copy your API secret
});
app.use(express.json());
app.use("/api/v1", authorRouter);
const initDB = async () => {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS blogs(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    blogcontent TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    await sql`
    CREATE TABLE IF NOT EXISTS comments(
    id SERIAL PRIMARY KEY,
    comment VARCHAR(255) NOT NULL,
    userid VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    blogid VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    await sql`
    CREATE TABLE IF NOT EXISTS savedblogs(
    id SERIAL PRIMARY KEY,
    userid VARCHAR(255) NOT NULL,
    blogid VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    console.log("database initialized successfully");
  } catch (error) {
    console.log("Error initDb", error);
  }
};
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Author Service is listening on PORT ${PORT}`);
  });
});
