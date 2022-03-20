import express from "express";

const router = express.Router();

// @desc    Login/Landing page
// @route   GET /
router.get("/", (req, res) => {
  res.render(`login`);
});

// @desc    Login/Landing page
// @route   GET /
router.get("/dashboard", (req, res) => {
  res.render(`dashboard`);
});

export default router;
