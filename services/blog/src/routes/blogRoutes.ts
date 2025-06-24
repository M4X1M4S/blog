import express from "express";
import { getAllBlogs } from "../controllers/blogControllers.js";

const router = express.Router();
router.get("/blog/all", getAllBlogs);
export default router;
