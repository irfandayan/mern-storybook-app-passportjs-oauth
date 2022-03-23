import express from "express";
import Story from "../models/Story.js";

const router = express.Router();
import { ensureAuth } from "../middleware/auth.js";

// @desc    Show add page
// @route   GET /stories/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});

// @desc    Process add form
// @route   GET /stories/add
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.error(err);
    res.render("error/500");
  }
});

export default router;
