// TODO: Announcement Model
// Represents announcements made by a club.
// Each document belongs to one club and includes a title, body, and creator info.
// Possible structure:
// { clubId, createdBy, title, body, createdAt, updatedAt }
import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", announcementSchema);
export default Announcement;