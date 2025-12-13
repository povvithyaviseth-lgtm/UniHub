// services/event.service.js
import Event from "../models/event.model.js";
import Club from "../models/club.js"; // Assuming your Club model is named 'Club'

/**
 * Helper function to create standardized errors with status codes.
 * @param {string} message - The error message.
 * @param {number} statusCode - The HTTP status code.
 * @returns {Error} The error object.
 */
function createError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

// Create a new event for a club
export async function createEventService({
  clubId,
  ownerId, // Passed from req.user?.id
  title,
  date,
  startTime,
  location,
  description,
  image,
}) {
  // 1. Validation Checks
  if (!title) throw createError("Event title is required", 400);
  if (!date) throw createError("Event date is required", 400);
  if (!location) throw createError("Event location is required", 400);

  // 2. Authorization Checks
  // Ensure the club exists
  const club = await Club.findById(clubId);
  if (!club) {
    throw createError("Club not found", 404);
  }

  // Ensure only the owner can create events for this club
  if (ownerId && club.owner && club.owner.toString() !== ownerId.toString()) {
    throw createError("Not allowed to create events for this club", 403);
  }

  // 3. Database Creation
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

// Get a single event by ID (to view details or edit)
export async function getEventByIdService(eventId) {
    const event = await Event.findById(eventId)
        .populate("club", "name image")
        .lean();
    
    if (!event) {
        throw createError("Event not found", 404);
    }
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

// Update an existing event
export async function updateEventService(eventId, ownerId, updateData) {
    // Check if the event exists and retrieve the club ID for authorization
    const event = await Event.findById(eventId).select('club');
    if (!event) {
        throw createError("Event not found", 404);
    }

    // Authorization: Ensure the user owns the club related to the event
    const club = await Club.findById(event.club);
    if (!club || (ownerId && club.owner && club.owner.toString() !== ownerId.toString())) {
        throw createError("Not allowed to update this event", 403);
    }

    // Perform the update
    const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        updateData,
        { new: true, runValidators: true } // Return new document, run schema validation
    ).lean();

    return updatedEvent;
}

// Delete an event
export async function deleteEventService(eventId, ownerId) {
    // Check if the event exists and retrieve the club ID for authorization
    const event = await Event.findById(eventId).select('club');
    if (!event) {
        throw createError("Event not found", 404);
    }

    // Authorization: Ensure the user owns the club related to the event
    const club = await Club.findById(event.club);
    if (!club || (ownerId && club.owner && club.owner.toString() !== ownerId.toString())) {
        throw createError("Not allowed to delete this event", 403);
    }

    // In a real application, you MUST delete all associated RSVP records here as well!
    // Example: await GuestModel.deleteMany({ event: eventId });

    // Perform the deletion
    const deletedEvent = await Event.findByIdAndDelete(eventId).lean();

    return deletedEvent;
}