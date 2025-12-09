// controllers/event.controller.js
import Notification from "../models/notification.model.js";
import Club from "../models/club.model.js";
import mongoose from "mongoose";
import {
  createEventService,
  getEventsByClubService,
  getAllEventsService,
} from "../services/event.service.js";

// POST /api/events/:clubId
// Create a new event for a given club
export const createEventController = async (req, res) => {
  try {
    console.log("🔥 [EVENT] REQ.BODY:", req.body);
    console.log("🔥 [EVENT] REQ.FILE:", req.file);
    console.log("🔥 [EVENT] CONTENT-TYPE:", req.headers["content-type"]);

    const { clubId } = req.params;
    const ownerId = req.user?.id; // from auth middleware

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ message: "Invalid club ID" });
    }

    const { title, date, startTime, location, description } = req.body;

    // Decide the image path to store in DB (similar to club image)
    let image;
    if (req.file) {
      // Adjust this path to match your multer destination folder for events
      image = `/images/event/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    }

    const event = await createEventService({
      clubId,
      ownerId,
      title,
      date,
      startTime,
      location,
      description,
      image,
    });

        // ------------------------------
    // 2️⃣ CREATE NOTIFICATION (new)
    // ------------------------------

    // Get club name for notification
    const club = await Club.findById(clubId);

    // Format event datetime string
    const dateTime = `${date || "Date TBA"} ${startTime || ""}`.trim();

    // Create real notification
    await Notification.create({
      clubId,
      createdBy: ownerId,
      type: "event",
      title,                        // event title
      clubName: club?.name || "A Club",
      dateTime,                     // clean date string
      location: location || "Location TBA",
    });

    // ------------------------------

    return res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (err) {
    console.error("Error creating event:", err);
    const status = err.statusCode || 500;
    const message =
      status !== 500 ? err.message : "Server error creating event";
    return res.status(status).json({ message });
  }
};

// GET /api/events/club/:clubId
// Get all events for a specific club (for dashboard)
export const getEventsByClubController = async (req, res) => {
  try {
    const { clubId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ message: "Invalid club ID" });
    }

    const events = await getEventsByClubService(clubId);
    return res.status(200).json({ events });
  } catch (err) {
    console.error("Error fetching events for club:", err);
    return res
      .status(500)
      .json({ message: "Server error fetching club events" });
  }
};

// GET /api/events
// Get all events (for home page)
export const getAllEventsController = async (req, res) => {
  try {
    const events = await getAllEventsService();
    return res.status(200).json({ events });
  } catch (err) {
    console.error("Error fetching all events:", err);
    return res
      .status(500)
      .json({ message: "Server error fetching events" });
  }
};
