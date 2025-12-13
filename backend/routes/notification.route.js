import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import Notification from "../models/notification.model.js";

const router = express.Router();

/**
 * GET /api/notifications
 * Get all notifications for the logged-in student
 */
router.get("/", auth, async (req, res) => {
  try {
    const studentId = req.user.id;

    const notifications = await Notification.find({ student: studentId })
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({ notifications });
  } catch (err) {
    console.error("❌ Error fetching notifications:", err);
    res.status(500).json({ message: "Server error fetching notifications" });
  }
});

/**
 * PUT /api/notifications/:id/read
 * Mark a notification as read for the logged-in student
 */
router.put("/:id/read", auth, async (req, res) => {
  try {
    const studentId = req.user.id;
    const notificationId = req.params.id;

    const updated = await Notification.findOneAndUpdate(
      { _id: notificationId, student: studentId }, // ensure student owns it
      { checked: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Notification not found or not owned by user" });
    }

    res.status(200).json({ notification: updated });
  } catch (err) {
    console.error("❌ Error marking notification read:", err);
    res.status(500).json({ message: "Server error updating notification" });
  }
});

export default router;