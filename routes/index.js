import express from "express";
import Story from "../models/Story.js";

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
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render(`dashboard`, {
      name: req.user.firstName,
      stories,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

export default router;
