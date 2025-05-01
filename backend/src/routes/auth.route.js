import express from "express";
import { checkAuth, getUserProfile, login, logout, signup } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protectRoute, getUserProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
