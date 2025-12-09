// models/event.model.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },

    // Event title / name
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Path to image file (e.g. "/images/event/filename.png")
    image: {
      type: String,
    },

    // We'll store the date as "YYYY-MM-DD" string for simplicity,
    // to match what your frontend likely sends.
    date: {
      type: String,
      required: true,
    },

    // Start times as "HH:mm"
    startTime: {
      type: String,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
