// controllers/event.controller.js
import Notification from "../models/notification.model.js";
import Club from "../models/club.model.js";
import ClubMembership from "../models/membership.model.js";
import Student from "../models/student.model.js";
import { sendEmail } from "../utils/email.js";

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
   /* const club = await Club.findById(clubId);

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
    });*/

    // ------------------------------
    // ------------------------------
// 2️⃣ SEND NOTIFICATIONS TO ALL CLUB MEMBERS
// ------------------------------

// Get club name for notification
const club = await Club.findById(clubId);

// Format event datetime
//const dateTime = `${date || "Date TBA"} ${startTime || ""}`.trim();
const dateTime = date && startTime 
  ? `${date} ${startTime}` 
  : date 
    ? `${date}` 
    : startTime 
      ? `${startTime}` 
      : "Date/Time TBA";

// 1. Find all students who joined this club
const members = await ClubMembership.find({ club: clubId }).select("student");
console.log("📘 MEMBERS FOUND:", members);

// 2. Build one notification per student
const notifications = members.map((m) => ({
  student: m.student,               // << who receives the notification
  clubId,
  createdBy: ownerId,
  type: "event",
  title: `New Event: ${title}`,
  clubName: club?.name || "A Club",
  dateTime,
  location: location || "Location TBA",
  checked: false,
}));
console.log("📬 NOTIFICATIONS TO INSERT:", notifications);

// 3. Insert them into DB
/*if (notifications.length > 0) {
  await Notification.insertMany(notifications);
}*/
if (notifications.length > 0) {
  try {
    const inserted = await Notification.insertMany(notifications);
    console.log("📢 NOTIFICATIONS INSERTED:", inserted);
  } catch (err) {
    console.error("❌ NOTIFICATION INSERT FAILED:", err);
  }
} else {
  console.log("⚠️ NO MEMBERS — NO NOTIFICATIONS CREATED");
}
// 5️⃣ Send email to all club members about the event
for (const member of members) {
  const student = await Student.findById(member.student).select("email");

  if (student?.email) {
    try {
      await sendEmail({
        to: student.email,
        subject: `New Event from ${club?.name || "Your Club"}`,
        text: `A new event has been created!

📅 Event: ${title}
📍 Location: ${location || "Location TBA"}
🕒 When: ${dateTime}

📝 Description:
${description || "No description provided."}

Visit UniHub to view or RSVP to this event.`,
      });

      console.log(`📧 Event email sent to ${student.email}`);

    } catch (emailErr) {
      console.error("❌ Error sending event email:", emailErr);
    }
  }
}


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
