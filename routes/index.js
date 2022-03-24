import express from "express";
import { userLogin, userDashboard } from "../controllers/index.js";
import { ensureAuth, ensureGuest } from "../middleware/auth.js";

const router = express.Router();

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, userLogin);

// @desc    Login/Landing page
// @route   GET /
router.get("/dashboard", ensureAuth, userDashboard);

export default router;
