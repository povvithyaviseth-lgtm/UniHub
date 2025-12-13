// backend/routes/rsvp.route.js
import express from "express";
import {
  submitRsvpController,         // Handles POST (Create/Update RSVP)
  getRsvpsByEventIdController,  // Handles GET (Admin list view)
  updateRsvpStatusController,   // Handles PUT (Admin status change)
  deleteRsvpController,         // Handles DELETE (Admin or Guest removal)
} from "../controllers/rsvp.controller.js"; // Note the controller file name change

import { auth } from "../middleware/auth.middleware.js"; // For protected routes

const router = express.Router();

// Middleware for logging route hits
router.use((req, res, next) => {
  console.log("➡️ rsvpRoutes hit:", req.method, req.originalUrl);
  next();
});

// --- Public Routes (Used by Guests) ---

// 1. Submit or Update a new RSVP entry
// POST /api/rsvps
router.post("/", submitRsvpController);


// --- Protected Routes (Used by Club Owners/Admins) ---

// 2. Get all RSVPs for a specific event (Used by RsvpList.jsx)
// GET /api/rsvps/event/:eventId
router.get("/event/:eventId", auth, getRsvpsByEventIdController);

// 3. Update the RSVP status (e.g., changing from 'Pending' to 'Confirmed' by an admin)
// PUT /api/rsvps/:rsvpId/status
router.put("/:rsvpId/status", auth, updateRsvpStatusController);

// 4. Delete an RSVP record (Admin or Guest deleting their own RSVP)
// DELETE /api/rsvps/:rsvpId
router.delete("/:rsvpId", auth, deleteRsvpController);


export default router;