// backend/routes/rsvp.route.js
import express from "express";
import {
  submitRsvpController,
  getRsvpsByEventIdController,
  updateRsvpStatusController,
  deleteRsvpController,
} from "../controllers/rsvp.controller.js";

import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Submit or update RSVP
router.post("/", submitRsvpController);

// Get RSVPs for an event
router.get("/event/:eventId", auth, getRsvpsByEventIdController);

// Admin updates RSVP manually
router.put("/:rsvpId/status", auth, updateRsvpStatusController);

// Delete RSVP
router.delete("/:rsvpId", auth, deleteRsvpController);

export default router;