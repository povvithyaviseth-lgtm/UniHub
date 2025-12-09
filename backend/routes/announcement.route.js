import express from "express";
import {
  createAnnouncement,
  getAnnouncementsByClub,
  updateAnnouncement,
  deleteAnnouncement
} from "../controllers/announcement.controller.js";

const router = express.Router();

// CREATE a new announcement
router.post("/", createAnnouncement);

// GET all announcements for a club
router.get("/club/:clubId", getAnnouncementsByClub);

// UPDATE an announcement
router.put("/:id", updateAnnouncement);

// DELETE an announcement
router.delete("/:id", deleteAnnouncement);

export default router;