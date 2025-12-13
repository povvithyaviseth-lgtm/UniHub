import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import Notification from "../models/notification.model.js";
import { getNotificationsByClub, markAsRead } from "../services/notification.service.js";

const router = express.Router();

// GET notifications for a club
router.get("/", auth, async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json({ notifications });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Mark a notification as read
router.put("/:id/read", auth, async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { readBy: req.user.id } },
      { new: true }
    );
    res.json({ notification: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;