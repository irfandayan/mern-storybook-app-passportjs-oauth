import express from "express";

import {
  authWithGoogle,
  googleAuthCallback,
  logoutUser,
} from "../controllers/auth.js";

const router = express.Router();

// @desc   Auth with Google
// @route   GET /auth/google
router.get("/google", authWithGoogle);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get("/google/callback", ...googleAuthCallback);

// @desc    Logout User
// @route   /auth/logout
router.get("/logout", logoutUser);

export default router;
