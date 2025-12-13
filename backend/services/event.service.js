// services/event.service.js
import Event from "../models/event.model.js";
import Club from "../models/club.model.js";

// Create a new event for a club
export async function createEventService({
  clubId,
  ownerId,
  title,
  date,
  startTime,
  location,
  description,
  image,
}) {
  if (!title) {
    const err = new Error("Event title is required");
    err.statusCode = 400;
    throw err;
  }

  if (!date) {
    const err = new Error("Event date is required");
    err.statusCode = 400;
    throw err;
  }

  if (!location) {
    const err = new Error("Event location is required");
    err.statusCode = 400;
    throw err;
  }

  // Ensure the club exists
  const club = await Club.findById(clubId);
  if (!club) {
    const err = new Error("Club not found");
    err.statusCode = 404;
    throw err;
  }

  // Ensure only the owner can create events for this club
  if (ownerId && club.owner && club.owner.toString() !== ownerId.toString()) {
    const err = new Error("Not allowed to create events for this club");
    err.statusCode = 403;
    throw err;
  }

  const event = await Event.create({
    club: clubId,
    title,
    date,
    startTime,
    location,
    description,
    image,
  });

  return event;
}

// Get all events for a specific club (for club dashboard)
export async function getEventsByClubService(clubId) {
  return Event.find({ club: clubId })
    .sort({ date: 1, startTime: 1 })
    .lean();
}

// Get all events across all clubs (for home page)
export async function getAllEventsService() {
  return Event.find({})
    .populate("club", "name image") // optional, so homepage can show club info
    .sort({ date: 1, startTime: 1 })
    .lean();
}
