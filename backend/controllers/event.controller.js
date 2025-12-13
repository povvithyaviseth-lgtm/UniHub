// backend/controllers/rsvp.controller.js
import mongoose from "mongoose";
import {
  submitRsvpService,
  getAllRsvpsService,
  updateRsvpStatusService,
  deleteRsvpService,
} from "../services/rsvp.service.js";

// Models (Needed for potential future notification/event checks)
import EventModel from "../models/event.model.js"; 
// import Club from "../models/club.model.js"; // For Admin logic

// --- 1. POST /api/rsvps (Submit/Update RSVP) ---

/**
 * Handles the creation or update of an RSVP record by a guest/student.
 * This is typically a PUBLIC route.
 */
export const submitRsvpController = async (req, res) => {
  try {
    console.log("🔥 [RSVP] SUBMIT REQ.BODY:", req.body);

    // Fields expected from the client-side RsvpForm
    const { eventId, name, email, partySize, status } = req.body;

    if (!eventId || !name || !email || !status) {
      return res.status(400).json({ message: "Missing required RSVP fields (eventId, name, email, status)." });
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID format." });
    }

    // Call the service layer to handle business logic and persistence
    const result = await submitRsvpService(eventId, name, email, partySize, status);

    // ------------------------------
    // NOTE: In a real app, you might add logic here:
    // 1. Check if capacity has been exceeded.
    // 2. Send a confirmation email to the guest.
    // ------------------------------

    const statusCode = result.action === 'created' ? 201 : 200;
    const message = result.action === 'created' ? 'RSVP submitted successfully.' : 'RSVP updated successfully.';

    return res.status(statusCode).json({
      success: true,
      message,
      rsvp: result.guest,
      action: result.action
    });

  } catch (err) {
    console.error("Error submitting RSVP:", err);
    let status = 500;
    let message = "Server error processing RSVP.";

    if (err.message.includes('duplicate key error')) {
      status = 409; // Conflict
      message = 'You have already submitted an RSVP for this event.';
    } else if (err.message.includes('Event not found') || err.message.includes('RSVP deadline passed')) {
      status = 403;
      message = err.message;
    }

    return res.status(status).json({ message });
  }
};


// --- 2. GET /api/rsvps/event/:eventId (Get Rsvp List) ---

/**
 * Handles retrieving all RSVPs for a given event.
 * This is a PROTECTED route, intended for the Club Owner/Admin.
 */
export const getRsvpsByEventIdController = async (req, res) => {
  try {
    const { eventId } = req.params;
    // const adminId = req.user?.id; // from auth middleware

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID format." });
    }

    // NOTE: Authorization Check Example:
    /*
    const event = await EventModel.findById(eventId);
    if (!event || event.club.toString() !== ownerClubId) { // ownerClubId derived from adminId
        return res.status(403).json({ message: "Forbidden: You do not manage this event." });
    }
    */

    const rsvps = await getAllRsvpsService(eventId);

    return res.status(200).json({
      success: true,
      rsvps,
      count: rsvps.length
    });

  } catch (err) {
    console.error("Error fetching RSVPs:", err);
    return res.status(500).json({ message: "Server error fetching RSVPs." });
  }
};


// --- 3. PUT /api/rsvps/:rsvpId/status (Update Status) ---

/**
 * Handles updating the status of a specific RSVP record.
 * This is a PROTECTED route, intended for the Club Owner/Admin.
 */
export const updateRsvpStatusController = async (req, res) => {
  try {
    const { rsvpId } = req.params;
    const { newStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(rsvpId)) {
      return res.status(400).json({ message: "Invalid RSVP ID format." });
    }
    if (!newStatus) {
      return res.status(400).json({ message: "Missing newStatus field." });
    }
    // Authorization check omitted but necessary

    const updatedRsvp = await updateRsvpStatusService(rsvpId, newStatus);

    return res.status(200).json({
      success: true,
      message: "RSVP status updated successfully.",
      rsvp: updatedRsvp,
    });
  } catch (err) {
    console.error("Error updating RSVP status:", err);
    let status = 500;
    if (err.message.includes('RSVP record not found')) {
      status = 404;
    }
    return res.status(status).json({ message: err.message });
  }
};


// --- 4. DELETE /api/rsvps/:rsvpId (Delete RSVP) ---

/**
 * Handles the deletion of a specific RSVP record.
 * This is a PROTECTED route.
 */
export const deleteRsvpController = async (req, res) => {
  try {
    const { rsvpId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(rsvpId)) {
      return res.status(400).json({ message: "Invalid RSVP ID format." });
    }
    // Authorization check omitted but necessary (Admin or Guest must own the record)

    const deletedRsvp = await deleteRsvpService(rsvpId);

    return res.status(200).json({
      success: true,
      message: "RSVP record deleted successfully.",
      rsvp: deletedRsvp,
    });
  } catch (err) {
    console.error("Error deleting RSVP:", err);
    let status = 500;
    if (err.message.includes('RSVP record not found')) {
      status = 404;
    }
    return res.status(status).json({ message: err.message });
  }
};