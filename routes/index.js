import express from "express";

const router = express.Router();
import { ensureAuth, ensureGuest } from "../middleware/auth.js";

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
  res.render(`login`, {
    layout: "login",
  });
});

// @desc    Login/Landing page
// @route   GET /
router.get("/dashboard", ensureAuth, (req, res) => {
  res.render(`dashboard`);
});

export default router;
