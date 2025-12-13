// backend/models/rsvp.model.js
import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    status: {
      type: String,
      enum: ["Going", "Not Going", "Interested"],
      default: "Interested",
    },
  },
  { timestamps: true }
);

export default mongoose.model("RSVP", rsvpSchema);