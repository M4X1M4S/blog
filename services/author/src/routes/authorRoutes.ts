import express from "express";
const router = express.Router();
import {
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/authorControllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
router.post("/blog/new", isAuth, upload, createBlog);
router.post("/blog/:id", isAuth, upload, updateBlog);
router.delete("/blog/:id", isAuth, deleteBlog);
export default router;
