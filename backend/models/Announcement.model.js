import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    clubName: { type: String, required: true },
    description: { type: String, required: true },
    clubId: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
