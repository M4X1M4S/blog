import { Router } from "express";
const router = Router();
import { loginUser } from "../controllers/userControllers.js";
router.post("/login", loginUser);
export default router;
