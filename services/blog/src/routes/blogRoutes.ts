import express from "express";
import { getAllBlogs, getBlogById } from "../controllers/blogControllers.js";

const router = express.Router();
router.get("/blog/all", getAllBlogs);
router.get("/blog/:blogId", getBlogById);
export default router;
