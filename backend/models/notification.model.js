import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    clubId: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },

    // These match your Notification UI
    title: { type: String, required: true },
    clubName: { type: String, required: true },
    dateTime: { type: String, required: true },
    location: { type: String, required: true },

    type: {
      type: String,
      enum: ["event", "announcement", "general"],
      default: "event",
    },

    readBy: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Student" }
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);