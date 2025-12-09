// routes/event.route.js
import express from "express";
import {
  createEventController,
  getEventsByClubController,
  getAllEventsController,
} from "../controllers/event.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("➡️ eventsRoutes hit:", req.method, req.originalUrl);
  next();
});

// Create event for a club (protected, with image upload)
// POST /api/events/:clubId
router.post(
  "/:clubId",
  auth,
  upload.single("image"), // <input name="image" ... />
  createEventController
);

// Get all events for a specific club (dashboard)
// GET /api/events/club/:clubId
router.get("/club/:clubId", getEventsByClubController);

// Get all events (for home page)
// GET /api/events
router.get("/", getAllEventsController);

export default router;
