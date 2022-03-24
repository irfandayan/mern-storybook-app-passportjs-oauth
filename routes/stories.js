import express from "express";
import { ensureAuth } from "../middleware/auth.js";
import {
  showAddPage,
  processAddForm,
  showAllStories,
  showSingleStory,
  showEditPage,
  updateStory,
  deleteStory,
  userStories,
} from "../controllers/stories.js";

const router = express.Router();

// @desc    Show add page
// @route   GET /stories/add
router.get("/add", ensureAuth, showAddPage);

// @desc    Process add form
// @route   GET /stories/add
router.post("/", ensureAuth, processAddForm);

// @desc    Show all stories
// @route   GET /stories
router.get("/", ensureAuth, showAllStories);

// @desc    Show single story
// @route   GET /stories/:id
router.get("/:id", ensureAuth, showSingleStory);

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get("/edit/:id", ensureAuth, showEditPage);

// @desc    Update story
// @route   PUT /stories/:id
router.put("/:id", ensureAuth, updateStory);

// @desc    Delete Story
// @route   DELETE /stories/:id
router.delete("/:id", ensureAuth, deleteStory);

// @desc    User stories
// @route   GET /stories/user/:userID
router.get("/user/:userId", ensureAuth, userStories);

// export router  -
export default router;
