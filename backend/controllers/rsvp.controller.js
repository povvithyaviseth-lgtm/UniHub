// backend/controllers/rsvp.controller.js
import RSVP from "../models/rsvp.model.js";
import Event from "../models/event.model.js";
import Student from "../models/student.model.js";

// 1. Submit or update RSVP
export const submitRsvpController = async (req, res) => {
  try {
    const { eventId, studentId, status } = req.body;

    if (!eventId || !studentId)
      return res.status(400).json({ message: "Missing data" });

    // Update existing RSVP or create new one
    const rsvp = await RSVP.findOneAndUpdate(
      { event: eventId, student: studentId },
      { status },
      { new: true, upsert: true }
    );

    return res.status(200).json({ message: "RSVP saved", rsvp });
  } catch (err) {
    console.error("RSVP ERROR:", err);
    return res.status(500).json({ message: "Server error saving RSVP" });
  }
};

// 2. Get all RSVPs for an event
export const getRsvpsByEventIdController = async (req, res) => {
  try {
    const { eventId } = req.params;

    const rsvps = await RSVP.find({ event: eventId })
      .populate("student", "name email")
      .lean();

    return res.status(200).json({ rsvps });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error loading RSVPs" });
  }
};

// 3. Update RSVP status manually
export const updateRsvpStatusController = async (req, res) => {
  try {
    const { rsvpId } = req.params;
    const { status } = req.body;

    const updated = await RSVP.findByIdAndUpdate(
      rsvpId,
      { status },
      { new: true }
    );

    return res.status(200).json({ message: "RSVP updated", updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error updating RSVP" });
  }
};

// 4. Delete RSVP
export const deleteRsvpController = async (req, res) => {
  try {
    const { rsvpId } = req.params;
    await RSVP.findByIdAndDelete(rsvpId);

    return res.status(200).json({ message: "RSVP deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error deleting RSVP" });
  }
};