import express from "express";
import {
  getAllAnnouncements,
  getAnnouncementsByClub,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getAnnouncementById,
} from "../controller/announcement.controller.js";

const router = express.Router();

// GET /api/announcements/data - Get all announcements
router.get("/data", getAllAnnouncements);

// GET /api/announcements/club/:clubId - Get announcements by club
router.get("/club/:clubId", getAnnouncementsByClub);

// GET /api/announcements/:id - Get single announcement
router.get("/:id", getAnnouncementById);

// POST /api/announcements/create - Create new announcement
router.post("/create", createAnnouncement);

// PUT /api/announcements/edit/:id - Update announcement
router.put("/edit/:id", updateAnnouncement);

// DELETE /api/announcements/delete/:id - Delete announcement
router.delete("/delete/:id", deleteAnnouncement);

export default router;