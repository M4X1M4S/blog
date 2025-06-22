import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
const router = Router();
import { getUserProfile, loginUser, myProfile, } from "../controllers/userControllers.js";
router.post("/login", loginUser);
router.get("/me", isAuth, myProfile);
router.get("/profile/:id", getUserProfile);
export default router;
