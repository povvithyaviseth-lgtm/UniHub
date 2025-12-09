import express from "express";
//import { authMiddleware } from "../middleware/auth.middleware.js";
import { auth as authMiddleware } from "../middleware/auth.middleware.js";
import {
  createAnnouncementController,
  getAnnouncementsController,
  updateAnnouncementController,
  deleteAnnouncementController,
} from "../controllers/announcement.controller.js";

const router = express.Router();

// GET: all announcements for a club
router.get("/:clubId", authMiddleware, getAnnouncementsController);

// POST: create announcement for a club
router.post("/:clubId", authMiddleware, createAnnouncementController);

// PUT: edit announcement
router.put("/:clubId/:announcementId", authMiddleware, updateAnnouncementController);

// DELETE: delete announcement
router.delete("/:clubId/:announcementId", authMiddleware, deleteAnnouncementController);

export default router;